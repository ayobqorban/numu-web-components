import {
  CtaBasic,
  HeroBasic,
  ImageTextCard,
  TextImage,
  renderWebBlock,
  webBlockRegistry,
} from "@ayobqorban/numu-web-components";
import { Fragment } from "react";
import styles from "./page.module.css";

const themeABlocks: readonly unknown[] = [
  {
    id: "hero-ar",
    type: "hero.basic",
    version: 1,
    props: {
      eyebrow: "مكونات NUMU",
      title: "حزمة واحدة لمواقع متعددة",
      description: "تم تثبيت المكونات من حزمة مستقلة والتحقق من البيانات قبل العرض.",
      primaryAction: { href: "#integration-status", label: "نتيجة التكامل" },
      alignment: "start",
      headingLevel: 1,
    },
  },
  {
    id: "card-ar",
    type: "card.image-text",
    version: 1,
    props: {
      image: {
        src: "/package-preview.svg",
        alt: "رسم يوضح انتقال الحزمة من المكتبة إلى الموقع",
        width: 1200,
        height: 750,
      },
      title: "بيانات موثوقة وقت التشغيل",
      description: "يفحص Registry المفتاح والإصدار والخصائص قبل إنشاء المكون.",
      action: { href: "#registry-status", label: "عرض حالات التحقق" },
      variant: "elevated",
      headingLevel: 2,
    },
  },
];

const themeBBlocks: readonly unknown[] = [
  {
    id: "content-en",
    type: "content.text-image",
    version: 1,
    props: {
      heading: "Installed once, themed by the consumer",
      description: "The component source stays unchanged while CSS custom properties define the company identity.",
      image: {
        src: "/package-preview.svg",
        alt: "Package lifecycle from source to a Next.js website",
        width: 1200,
        height: 900,
      },
      imagePosition: "end",
      action: { href: "#integration-status", label: "Review integration" },
      headingLevel: 2,
    },
  },
  {
    id: "cta-en",
    type: "cta.basic",
    version: 1,
    props: {
      title: "The package renders on the Next.js server",
      description: "No application-specific API, router, authentication, or duplicate React runtime is required.",
      primaryAction: { href: "#registry-status", label: "See validation states" },
      alignment: "center",
      headingLevel: 2,
    },
  },
];

const invalidBlocks: readonly unknown[] = [
  { id: "invalid-props", type: "hero.basic", version: 1, props: {} },
  { id: "unknown-key", type: "unknown.block", version: 1, props: {} },
  { id: "unsupported-version", type: "hero.basic", version: 99, props: {} },
];

const directPublicComponents = [HeroBasic, ImageTextCard, TextImage, CtaBasic];

function RenderedBlocks({ blocks }: Readonly<{ blocks: readonly unknown[] }>) {
  return blocks.map((block, index) => {
    const rendered = renderWebBlock(block, {
      fallback: (failure) => (
        <article className={styles.validationCard} data-validation-code={failure.code}>
          <strong>{failure.code}</strong>
          <span>The invalid block was rejected without crashing the page.</span>
        </article>
      ),
    });

    return <Fragment key={rendered.id ?? `block-${index}`}>{rendered.node}</Fragment>;
  });
}

export default function HomePage() {
  return (
    <main>
      <section className={`numu-web-theme theme-a ${styles.themeFrame}`} dir="rtl" lang="ar">
        <RenderedBlocks blocks={themeABlocks} />
      </section>

      <section className={`numu-web-theme theme-b ${styles.themeFrame}`} dir="ltr" lang="en">
        <RenderedBlocks blocks={themeBBlocks} />
      </section>

      <section className={styles.status} id="integration-status">
        <h2>Installed package verification</h2>
        <dl>
          <div>
            <dt>Registered blocks</dt>
            <dd>{webBlockRegistry.length}</dd>
          </div>
          <div>
            <dt>Direct public component imports</dt>
            <dd>{directPublicComponents.length}</dd>
          </div>
          <div>
            <dt>Rendering boundary</dt>
            <dd>Next.js Server Component</dd>
          </div>
        </dl>
      </section>

      <section className={styles.validation} id="registry-status">
        <h2>Safe runtime validation</h2>
        <div className={styles.validationGrid}>
          <RenderedBlocks blocks={invalidBlocks} />
        </div>
      </section>
    </main>
  );
}
