import { LayoutBrand, LayoutHeading, LayoutIconLink, LayoutNavigation } from "../blocks/layout-elements";

export function LayoutCatalogExample({ direction, region }: { direction: "rtl" | "ltr"; region: "header" | "footer" }) {
  const footer = region === "footer";
  return <div className="catalog-layout-demo">
    {footer
      ? <LayoutHeading alignment="start" level="h3" text={direction === "rtl" ? "ابق على تواصل" : "Stay connected"} />
      : <LayoutBrand href="/" name="NUMU" tagline={direction === "rtl" ? "نمو لأعمالك" : "Grow your business"} variant="inline" />}
    <LayoutNavigation label={footer ? "Footer navigation" : "Main navigation"} menuId={region} orientation="horizontal" items={[
      { key: "home", label: direction === "rtl" ? "الرئيسية" : "Home", href: "/" },
      { key: "services", label: direction === "rtl" ? "الخدمات" : "Services", href: "#catalog-card" },
    ]} />
    {!footer ? <LayoutIconLink action={{ href: "#catalog-cta", label: direction === "rtl" ? "تواصل" : "Contact" }} icon="mail" showLabel variant="soft" /> : null}
  </div>;
}
