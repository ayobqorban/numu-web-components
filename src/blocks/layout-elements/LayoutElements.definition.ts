import { defineWebBlock } from "../../registry/contracts";
import { LayoutBrand, LayoutHeading, LayoutIconLink, LayoutImage, LayoutNavigation } from "./LayoutElements";
import { layoutBrandSchema, layoutHeadingSchema, layoutIconLinkSchema, layoutImageSchema, layoutNavigationSchema } from "./LayoutElements.schema";
import type { LayoutBrandProps, LayoutHeadingProps, LayoutIconLinkProps, LayoutImageProps, LayoutNavigationProps } from "./LayoutElements.types";

const placements = ["header", "footer"] as const;
const alignmentOptions = ["start", "center", "end"].map((value) => ({
  value,
  label: {
    ar: value === "start" ? "البداية" : value === "center" ? "الوسط" : "النهاية",
    en: value.charAt(0).toUpperCase() + value.slice(1),
  },
}));

export const layoutBrandDefaults = {
  name: "NUMU",
  tagline: "Your digital presence",
  href: "/",
  variant: "inline",
} satisfies LayoutBrandProps;

export const layoutBrandDefinition = defineWebBlock({
  key: "layout.brand",
  version: 1,
  category: "layout",
  status: "experimental",
  placements,
  label: { ar: "هوية الموقع", en: "Site brand" },
  description: { ar: "الشعار واسم الموقع ووصفه المختصر.", en: "Website logo, name, and short tagline." },
  propsSchema: layoutBrandSchema,
  defaultProps: layoutBrandDefaults,
  supportedVariants: ["inline", "stacked"],
  editor: {
    groups: [
      {
        key: "content",
        label: { ar: "الهوية", en: "Brand" },
        fields: [
          { path: "name", kind: "text", label: { ar: "الاسم", en: "Name" }, required: true, max: 160 },
          { path: "tagline", kind: "text", label: { ar: "الوصف المختصر", en: "Tagline" }, max: 240 },
          { path: "href", kind: "url", label: { ar: "الرابط", en: "Link" }, required: true, max: 2048 },
          { path: "variant", kind: "select", label: { ar: "طريقة العرض", en: "Presentation" }, required: true, options: [
            { value: "inline", label: { ar: "أفقي", en: "Inline" } },
            { value: "stacked", label: { ar: "رأسي", en: "Stacked" } },
          ] },
        ],
      },
      {
        key: "logo",
        path: "logo",
        label: { ar: "الشعار", en: "Logo" },
        optional: true,
        defaultValue: { src: "https://placehold.co/160x80", alt: "Website logo", width: 160, height: 80 },
        fields: [
          { path: "src", kind: "url", label: { ar: "رابط الصورة", en: "Image URL" }, required: true, max: 2048 },
          { path: "alt", kind: "text", label: { ar: "النص البديل", en: "Alternative text" }, max: 500 },
          { path: "decorative", kind: "boolean", label: { ar: "زخرفية", en: "Decorative" } },
          { path: "width", kind: "number", label: { ar: "العرض", en: "Width" }, min: 1, max: 10000 },
          { path: "height", kind: "number", label: { ar: "الارتفاع", en: "Height" }, min: 1, max: 10000 },
        ],
      },
    ],
  },
  component: LayoutBrand,
});

export const layoutNavigationDefaults = {
  menuId: "primary",
  label: "Main navigation",
  orientation: "horizontal",
} satisfies LayoutNavigationProps;

export const layoutNavigationDefinition = defineWebBlock({
  key: "layout.navigation",
  version: 1,
  category: "layout",
  status: "experimental",
  placements,
  label: { ar: "قائمة تنقل", en: "Navigation menu" },
  description: { ar: "قائمة مستقلة يعاد استخدامها في الرأس أو التذييل.", en: "A reusable menu rendered in a header or footer." },
  propsSchema: layoutNavigationSchema,
  defaultProps: layoutNavigationDefaults,
  supportedVariants: ["horizontal", "vertical"],
  editor: {
    groups: [{
      key: "navigation",
      label: { ar: "القائمة", en: "Navigation" },
      fields: [
        { path: "menuId", kind: "resource", resource: "menu", label: { ar: "القائمة المرتبطة", en: "Linked menu" }, required: true },
        { path: "label", kind: "text", label: { ar: "وصف الوصول", en: "Accessible label" }, required: true, max: 160 },
        { path: "orientation", kind: "select", label: { ar: "الاتجاه", en: "Orientation" }, required: true, options: [
          { value: "horizontal", label: { ar: "أفقي", en: "Horizontal" } },
          { value: "vertical", label: { ar: "رأسي", en: "Vertical" } },
        ] },
      ],
    }],
  },
  component: LayoutNavigation,
});

export const layoutHeadingDefaults = {
  text: "Website section",
  level: "span",
  alignment: "start",
} satisfies LayoutHeadingProps;

export const layoutHeadingDefinition = defineWebBlock({
  key: "layout.heading",
  version: 1,
  category: "layout",
  status: "experimental",
  placements,
  label: { ar: "عنوان أو نص", en: "Heading or text" },
  description: { ar: "عنوان مختصر أو نص تعريفي للرأس والتذييل.", en: "A short heading or descriptive text for layouts." },
  propsSchema: layoutHeadingSchema,
  defaultProps: layoutHeadingDefaults,
  supportedVariants: ["span", "h2", "h3", "p"],
  editor: {
    groups: [{
      key: "content",
      label: { ar: "المحتوى", en: "Content" },
      fields: [
        { path: "text", kind: "text", label: { ar: "النص", en: "Text" }, required: true, max: 240 },
        { path: "level", kind: "select", label: { ar: "النوع", en: "Type" }, required: true, options: ["span", "h2", "h3", "p"].map((value) => ({ value, label: { ar: value.toUpperCase(), en: value.toUpperCase() } })) },
        { path: "alignment", kind: "select", label: { ar: "المحاذاة", en: "Alignment" }, required: true, options: alignmentOptions },
      ],
    }],
  },
  component: LayoutHeading,
});

export const layoutImageDefaults = {
  image: { src: "https://placehold.co/320x160", alt: "Decorative website image", width: 320, height: 160 },
  maxWidth: 200,
} satisfies LayoutImageProps;

export const layoutImageDefinition = defineWebBlock({
  key: "layout.image",
  version: 1,
  category: "layout",
  status: "experimental",
  placements,
  label: { ar: "صورة", en: "Image" },
  description: { ar: "صورة قابلة للربط بحجم مناسب للتخطيط.", en: "A linkable image sized for layout regions." },
  propsSchema: layoutImageSchema,
  defaultProps: layoutImageDefaults,
  supportedVariants: [],
  editor: {
    groups: [
      {
        key: "image",
        path: "image",
        label: { ar: "الصورة", en: "Image" },
        defaultValue: layoutImageDefaults.image,
        fields: [
          { path: "src", kind: "url", label: { ar: "رابط الصورة", en: "Image URL" }, required: true, max: 2048 },
          { path: "alt", kind: "text", label: { ar: "النص البديل", en: "Alternative text" }, max: 500 },
          { path: "decorative", kind: "boolean", label: { ar: "زخرفية", en: "Decorative" } },
          { path: "width", kind: "number", label: { ar: "العرض الأصلي", en: "Source width" }, min: 1, max: 10000 },
          { path: "height", kind: "number", label: { ar: "الارتفاع الأصلي", en: "Source height" }, min: 1, max: 10000 },
        ],
      },
      {
        key: "presentation",
        label: { ar: "العرض", en: "Presentation" },
        fields: [
          { path: "href", kind: "url", label: { ar: "الرابط", en: "Link" }, max: 2048 },
          { path: "maxWidth", kind: "number", label: { ar: "أقصى عرض", en: "Maximum width" }, required: true, min: 24, max: 640 },
        ],
      },
    ],
  },
  component: LayoutImage,
});

export const layoutIconLinkDefaults = {
  icon: "mail",
  action: { href: "/contact", label: "Contact us" },
  showLabel: true,
  variant: "soft",
} satisfies LayoutIconLinkProps;

export const layoutIconLinkDefinition = defineWebBlock({
  key: "layout.icon-link",
  version: 1,
  category: "layout",
  status: "experimental",
  placements,
  label: { ar: "أيقونة ورابط", en: "Icon link" },
  description: { ar: "أيقونة اتصال أو إجراء مع تسمية اختيارية.", en: "A contact or action icon with an optional visible label." },
  propsSchema: layoutIconLinkSchema,
  defaultProps: layoutIconLinkDefaults,
  supportedVariants: ["plain", "soft", "outline"],
  editor: {
    groups: [
      {
        key: "action",
        path: "action",
        label: { ar: "الإجراء", en: "Action" },
        defaultValue: layoutIconLinkDefaults.action,
        fields: [
          { path: "label", kind: "text", label: { ar: "التسمية", en: "Label" }, required: true, max: 120 },
          { path: "href", kind: "url", label: { ar: "الرابط", en: "Link" }, required: true, max: 2048 },
        ],
      },
      {
        key: "presentation",
        label: { ar: "العرض", en: "Presentation" },
        fields: [
          { path: "icon", kind: "select", label: { ar: "الأيقونة", en: "Icon" }, required: true, options: ["mail", "phone", "location", "search", "account", "cart"].map((value) => ({ value, label: { ar: value, en: value } })) },
          { path: "showLabel", kind: "boolean", label: { ar: "إظهار التسمية", en: "Show label" } },
          { path: "variant", kind: "select", label: { ar: "النمط", en: "Variant" }, required: true, options: ["plain", "soft", "outline"].map((value) => ({ value, label: { ar: value, en: value } })) },
        ],
      },
    ],
  },
  component: LayoutIconLink,
});
