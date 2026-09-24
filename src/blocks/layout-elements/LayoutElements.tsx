import type { ReactNode } from "react";
import { classNames } from "../../utils/classes";
import type { LayoutBrandProps, LayoutHeadingProps, LayoutIconLinkProps, LayoutImageProps, LayoutNavigationProps } from "./LayoutElements.types";
import styles from "./LayoutElements.module.css";

export function LayoutBrand({ name, tagline, href, logo, variant }: LayoutBrandProps) {
  return <a className={classNames(styles.brand, variant === "stacked" && styles.stacked)} href={href} data-numu-block="layout.brand">
    {logo ? <img className={styles.logo} src={logo.src} alt={logo.decorative ? "" : logo.alt} width={logo.width} height={logo.height} /> : <span className={styles.brandMark} aria-hidden="true">{name.slice(0, 1)}</span>}
    <span><strong>{name}</strong>{tagline ? <small>{tagline}</small> : null}</span>
  </a>;
}

export function LayoutNavigation({ label, orientation, items = [] }: LayoutNavigationProps) {
  return <nav aria-label={label} data-numu-block="layout.navigation"><ul className={classNames(styles.navigation, orientation === "vertical" && styles.vertical)}>{items.map((item) => <li key={item.key}><a href={item.href} target={item.newWindow ? "_blank" : undefined} rel={item.newWindow ? "noreferrer" : undefined}>{item.label}</a></li>)}</ul></nav>;
}

export function LayoutHeading({ text, level, alignment }: LayoutHeadingProps) {
  const content = <span className={styles.headingText}>{text}</span>;
  const className = classNames(styles.heading, styles[alignment]);
  if (level === "h2") return <h2 className={className} data-numu-block="layout.heading">{content}</h2>;
  if (level === "h3") return <h3 className={className} data-numu-block="layout.heading">{content}</h3>;
  if (level === "p") return <p className={className} data-numu-block="layout.heading">{content}</p>;
  return <span className={className} data-numu-block="layout.heading">{content}</span>;
}

export function LayoutImage({ image, href, maxWidth }: LayoutImageProps) {
  const node = <img className={styles.image} style={{ maxInlineSize: maxWidth + "px" }} src={image.src} alt={image.decorative ? "" : image.alt} width={image.width} height={image.height} />;
  return <span data-numu-block="layout.image">{href ? <a href={href}>{node}</a> : node}</span>;
}

const paths: Record<LayoutIconLinkProps["icon"], ReactNode> = {
  mail: <><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></>,
  phone: <path d="M6 3h4l2 5-3 2a16 16 0 0 0 5 5l2-3 5 2v4c0 2-2 3-4 3C9 20 4 15 3 7c0-2 1-4 3-4Z"/>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  account: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  cart: <><path d="M3 4h2l2 12h11l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
};

export function LayoutIconLink({ icon, action, showLabel, variant }: LayoutIconLinkProps) {
  return <a className={classNames(styles.iconLink, styles[variant])} href={action.href} target={action.target} rel={action.rel} data-numu-block="layout.icon-link"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>{showLabel ? <span>{action.label}</span> : <span className={styles.srOnly}>{action.label}</span>}</a>;
}
