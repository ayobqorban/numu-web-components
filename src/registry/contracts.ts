import type { ComponentType, ReactNode } from "react";
import type { z } from "zod";
import type { LocalizedText } from "../types/localized-text";

export type WebBlockStatus = "experimental" | "stable" | "deprecated";

export type WebBlockEditorFieldKind = "text" | "textarea" | "url" | "number" | "boolean" | "select" | "resource";

export type WebBlockPlacement = "page" | "header" | "footer";

export interface WebBlockEditorOption {
  value: string | number;
  label: LocalizedText;
}

export interface WebBlockEditorField {
  path: string;
  kind: WebBlockEditorFieldKind;
  label: LocalizedText;
  helpText?: LocalizedText;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: readonly WebBlockEditorOption[];
  resource?: "menu";
}

export interface WebBlockEditorGroup {
  key: string;
  path?: string;
  label: LocalizedText;
  optional?: boolean;
  defaultValue?: Readonly<Record<string, unknown>>;
  fields: readonly WebBlockEditorField[];
}

export interface WebBlockEditorContract {
  groups: readonly WebBlockEditorGroup[];
}

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
  placements: readonly WebBlockPlacement[];
  editor: WebBlockEditorContract;
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
    placements: Object.freeze([...definition.placements]),
    editor: Object.freeze({
      groups: Object.freeze(
        definition.editor.groups.map((group) =>
          Object.freeze({
            ...group,
            fields: Object.freeze(
              group.fields.map((field) =>
                Object.freeze({
                  ...field,
                  options: field.options ? Object.freeze([...field.options]) : undefined,
                }),
              ),
            ),
          }),
        ),
      ),
    }),
  });
}
