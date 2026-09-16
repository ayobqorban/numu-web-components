import { useState } from "react";
import { CtaBasic } from "../blocks/cta-basic";
import { HeroBasic } from "../blocks/hero-basic";
import { ImageTextCard } from "../blocks/image-text-card";
import { TextImage } from "../blocks/text-image";
import { WebContainer, WebSection } from "../primitives";

type ThemeName = "theme-a" | "theme-b";
type Direction = "rtl" | "ltr";
type Viewport = "mobile" | "tablet" | "desktop";

function initialTheme(): ThemeName {
  return new URLSearchParams(window.location.search).get("theme") === "theme-b" ? "theme-b" : "theme-a";
}

function initialDirection(): Direction {
  return new URLSearchParams(window.location.search).get("direction") === "ltr" ? "ltr" : "rtl";
}

function initialViewport(): Viewport {
  const viewport = new URLSearchParams(window.location.search).get("viewport");
  return viewport === "mobile" || viewport === "tablet" ? viewport : "desktop";
}

const catalogCopy = {
  rtl: {
    eyebrow: "مكونات NUMU المشتركة",
    title: "أساس موثوق لمواقع الشركات",
    description: "نفس المكونات، مع هوية ومحتوى واتجاه مختلف لكل شركة دون تعديل المصدر.",
    primary: "ابدأ الآن",
    secondary: "اقرأ التوثيق",
    cardTitle: "بطاقة مرنة وقابلة للتخصيص",
    cardDescription: "تتكيف البطاقة تلقائيًا مع اللون والاتجاه والمساحة المتاحة.",
    contentTitle: "عقود واضحة من المعاينة إلى الإنتاج",
    contentDescription: "يضمن Registry والتحقق وقت التشغيل أن تعرض لوحة NUMU والموقع النهائي البنية نفسها بأمان.",
    ctaTitle: "هل أنت مستعد لبناء موقع متسق؟",
    ctaDescription: "ابدأ بعدد قليل من المكونات عالية الجودة وقابلة للتطوير.",
  },
  ltr: {
    eyebrow: "NUMU shared components",
    title: "A dependable foundation for company websites",
    description: "The same components adapt to each company's theme, content, and direction without source changes.",
    primary: "Get started",
    secondary: "Read the docs",
    cardTitle: "A flexible, themeable card",
    cardDescription: "The card automatically adapts to color, direction, and the space available.",
    contentTitle: "Clear contracts from preview to production",
    contentDescription: "The registry and runtime validation keep NUMU previews and final websites safe and consistent.",
    ctaTitle: "Ready to build a consistent website?",
    ctaDescription: "Start with a small set of high-quality, extensible components.",
  },
} as const;

export function CatalogApp() {
  const [theme, setTheme] = useState<ThemeName>(initialTheme);
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [viewport, setViewport] = useState<Viewport>(initialViewport);
  const copy = catalogCopy[direction];

  return (
    <main className="catalog-shell">
      <header className="catalog-header">
        <div>
          <p className="catalog-kicker">@numu/web-components</p>
          <h1>Development catalog</h1>
          <p>Theme, direction, responsive layout, and block-contract review.</p>
        </div>
        <div aria-label="Catalog controls" className="catalog-controls">
          <label>
            Theme
            <select value={theme} onChange={(event) => setTheme(event.target.value as ThemeName)}>
              <option value="theme-a">Theme A · Green</option>
              <option value="theme-b">Theme B · Blue</option>
            </select>
          </label>
          <label>
            Direction
            <select value={direction} onChange={(event) => setDirection(event.target.value as Direction)}>
              <option value="rtl">RTL · Arabic</option>
              <option value="ltr">LTR · English</option>
            </select>
          </label>
          <label>
            Viewport
            <select value={viewport} onChange={(event) => setViewport(event.target.value as Viewport)}>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="desktop">Desktop</option>
            </select>
          </label>
        </div>
      </header>

      <div className={`catalog-preview ${viewport}`}>
        <div className={`numu-web-theme ${theme}`} dir={direction} lang={direction === "rtl" ? "ar" : "en"}>
          <HeroBasic
            alignment="start"
            description={copy.description}
            eyebrow={copy.eyebrow}
            headingLevel={1}
            image={{
              src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
              alt: direction === "rtl" ? "مساحة عمل حديثة" : "A modern workspace",
              width: 1200,
              height: 900,
            }}
            primaryAction={{ href: "#catalog-card", label: copy.primary }}
            secondaryAction={{ href: "#catalog-content", label: copy.secondary }}
            title={copy.title}
          />

          <WebSection ariaLabel={direction === "rtl" ? "مثال البطاقة" : "Card example"} surface="surface">
            <WebContainer>
              <div className="catalog-card-grid" id="catalog-card">
                {(["elevated", "outlined", "flat"] as const).map((variant) => (
                  <ImageTextCard
                    action={{ href: "#catalog-content", label: copy.primary }}
                    description={copy.cardDescription}
                    headingLevel={2}
                    image={{
                      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
                      alt: direction === "rtl" ? "فريق يعمل في مكتب" : "A team working in an office",
                      width: 1000,
                      height: 625,
                    }}
                    key={variant}
                    title={`${copy.cardTitle} · ${variant}`}
                    variant={variant}
                  />
                ))}
              </div>
            </WebContainer>
          </WebSection>

          <div id="catalog-content">
            <TextImage
              action={{ href: "#catalog-cta", label: copy.secondary }}
              description={copy.contentDescription}
              heading={copy.contentTitle}
              headingLevel={2}
              image={{
                src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
                alt: direction === "rtl" ? "فريق يراجع خطة" : "A team reviewing a plan",
                width: 1200,
                height: 900,
              }}
              imagePosition="start"
            />
          </div>

          <div id="catalog-cta">
            <CtaBasic
              alignment="center"
              description={copy.ctaDescription}
              headingLevel={2}
              primaryAction={{ href: "#catalog-card", label: copy.primary }}
              secondaryAction={{ href: "#catalog-content", label: copy.secondary }}
              title={copy.ctaTitle}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
