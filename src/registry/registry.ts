import { createElement } from "react";
import { z } from "zod";
import { ctaBasicDefinition } from "../blocks/cta-basic";
import { heroBasicDefinition } from "../blocks/hero-basic";
import { imageTextCardDefinition } from "../blocks/image-text-card";
import { textImageDefinition } from "../blocks/text-image";
import {
  layoutBrandDefinition,
  layoutHeadingDefinition,
  layoutIconLinkDefinition,
  layoutImageDefinition,
  layoutNavigationDefinition,
} from "../blocks/layout-elements";
import type {
  RenderWebBlockOptions,
  RenderWebBlockResult,
  WebBlockDefinition,
  WebBlockValidationFailure,
  WebBlockValidationResult,
} from "./contracts";

const webBlockInputSchema = z
  .object({
    id: z.string().trim().min(1).max(200).optional(),
    type: z.string().trim().min(1).max(120),
    version: z.number().int().positive(),
    props: z.unknown(),
  })
  .strict();

const definitions = [
  heroBasicDefinition,
  imageTextCardDefinition,
  textImageDefinition,
  ctaBasicDefinition,
  layoutBrandDefinition,
  layoutNavigationDefinition,
  layoutHeadingDefinition,
  layoutImageDefinition,
  layoutIconLinkDefinition,
] as const;

function definitionId(key: string, version: number): string {
  return `${key}@${version}`;
}

function createRegistry(): ReadonlyMap<string, WebBlockDefinition<object>> {
  const registry = new Map<string, WebBlockDefinition<object>>();
  for (const definition of definitions) {
    const id = definitionId(definition.key, definition.version);
    if (registry.has(id)) throw new Error(`Duplicate web block definition: ${id}`);
    registry.set(id, definition as unknown as WebBlockDefinition<object>);
  }
  return registry;
}

const registryMap = createRegistry();

export const webBlockRegistry = Object.freeze(definitions);

export function getWebBlockDefinition(type: string, version: number): WebBlockDefinition<object> | undefined {
  return registryMap.get(definitionId(type, version));
}

function issueMessages(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "input";
    return `${path}: ${issue.message}`;
  });
}

export function validateWebBlock(input: unknown): WebBlockValidationResult {
  const envelope = webBlockInputSchema.safeParse(input);
  if (!envelope.success) {
    return {
      success: false,
      code: "invalid-envelope",
      message: "The web block envelope is invalid.",
      issues: issueMessages(envelope.error),
    };
  }

  const matchingKey = definitions.some((definition) => definition.key === envelope.data.type);
  if (!matchingKey) {
    return {
      success: false,
      id: envelope.data.id,
      code: "unknown-block",
      message: `Unknown web block: ${envelope.data.type}`,
      issues: [],
    };
  }

  const definition = getWebBlockDefinition(envelope.data.type, envelope.data.version);
  if (!definition) {
    return {
      success: false,
      id: envelope.data.id,
      code: "unsupported-version",
      message: `Unsupported ${envelope.data.type} version: ${envelope.data.version}`,
      issues: [],
    };
  }

  const props = definition.propsSchema.safeParse(envelope.data.props);
  if (!props.success) {
    return {
      success: false,
      id: envelope.data.id,
      code: "invalid-props",
      message: `Invalid props for ${envelope.data.type}@${envelope.data.version}.`,
      issues: issueMessages(props.error),
    };
  }

  return {
    success: true,
    id: envelope.data.id,
    definition,
    props: props.data,
  };
}

function resolveFallback(
  fallback: RenderWebBlockOptions["fallback"],
  failure: WebBlockValidationFailure,
) {
  return typeof fallback === "function" ? fallback(failure) : (fallback ?? null);
}

export function renderWebBlock(input: unknown, options: RenderWebBlockOptions = {}): RenderWebBlockResult {
  const validation = validateWebBlock(input);
  if (!validation.success) {
    options.onError?.(validation);
    return {
      id: validation.id,
      node: resolveFallback(options.fallback, validation),
      validation,
    };
  }

  return {
    id: validation.id,
    node: createElement(validation.definition.component, validation.props),
    validation,
  };
}
