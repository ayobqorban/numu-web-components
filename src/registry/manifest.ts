import type { LocalizedText } from "../types/localized-text";
import type { WebBlockEditorContract, WebBlockStatus } from "./contracts";
import { webBlockRegistry } from "./registry";

export interface WebBlockManifestEntry {
  key: string;
  version: number;
  category: string;
  status: WebBlockStatus;
  label: LocalizedText;
  description: LocalizedText;
  defaultProps: object;
  supportedVariants: readonly string[];
  editor: WebBlockEditorContract;
}

export interface WebBlockManifest {
  schemaVersion: 1;
  blocks: readonly WebBlockManifestEntry[];
}

export const webBlockManifest: Readonly<WebBlockManifest> = Object.freeze({
  schemaVersion: 1,
  blocks: Object.freeze(
    webBlockRegistry.map((definition) =>
      Object.freeze({
        key: definition.key,
        version: definition.version,
        category: definition.category,
        status: definition.status,
        label: definition.label,
        description: definition.description,
        defaultProps: definition.defaultProps,
        supportedVariants: definition.supportedVariants,
        editor: definition.editor,
      }),
    ),
  ),
});
