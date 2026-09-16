# Manual visual QA

Run `npm run dev` in `examples/next-consumer`, open the printed local URL, and record browser/version, operating system, package version, date, and reviewer.

- Confirm the Arabic section is RTL, green-themed, readable, and logically aligned.
- Confirm the English section is LTR, blue-themed, readable, and isolated from the Arabic tokens.
- Confirm hero, image/text card, text/image content, and CTA render with correct spacing and media.
- Confirm invalid props, unknown block type, and unsupported version show safe fallback cards without leaking payloads.
- Check widths near 320, 768, 1024, and 1440 pixels with no horizontal overflow.
- Navigate by keyboard and verify visible focus, sensible order, link activation, headings, alternative text, and contrast.
- Check reduced-motion mode and zoom to 200 percent.
- Capture desktop and mobile screenshots for the release evidence.
