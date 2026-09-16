import type { ComponentType, ReactNode } from "react";
import type { z } from "zod";
import type { LocalizedText } from "../types/localized-text";

export type WebBlockStatus = "experimental" | "stable" | "deprecated";

export interface WebBlockDefinition<TProps extends object = object> {
  key: string;
  version: number;
  category: string;
  status: WebBlockStatus;
  label: LocalizedText;
  description: LocalizedText;
  propsSchema: z.ZodType<TProps>;
  defaultProps: TProps;
  supportedVariants: readonly string[];
  component: ComponentType<TProps>;
  migrateProps?: (fromVersion: number, toVersion: number, props: unknown) => unknown;
}

export interface WebBlockInput {
  id?: string;
  type: string;
  version: number;
  props: unknown;
}

export type WebBlockValidationErrorCode =
  | "invalid-envelope"
  | "unknown-block"
  | "unsupported-version"
  | "invalid-props";

export interface WebBlockValidationFailure {
  success: false;
  id?: string;
  code: WebBlockValidationErrorCode;
  message: string;
  issues: readonly string[];
}

export interface WebBlockValidationSuccess {
  success: true;
  id?: string;
  definition: WebBlockDefinition<object>;
  props: object;
}

export type WebBlockValidationResult = WebBlockValidationFailure | WebBlockValidationSuccess;

export interface RenderWebBlockOptions {
  fallback?: ReactNode | ((failure: WebBlockValidationFailure) => ReactNode);
  onError?: (failure: WebBlockValidationFailure) => void;
}

export interface RenderWebBlockResult {
  id?: string;
  node: ReactNode;
  validation: WebBlockValidationResult;
}

export function defineWebBlock<TProps extends object>(
  definition: WebBlockDefinition<TProps>,
): Readonly<WebBlockDefinition<TProps>> {
  return Object.freeze({
    ...definition,
    supportedVariants: Object.freeze([...definition.supportedVariants]),
  });
}
