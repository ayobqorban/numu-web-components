# RTL and LTR standard

Consumers set `dir` and language on a page or scoped container. Components never infer them.

- Use `margin-inline`, `padding-inline`, `inset-inline`, logical borders, and `text-align: start/end`.
- Avoid directional icons in core blocks; when necessary, mirror only icons whose meaning changes with direction.
- Preserve numbers, URLs, and media orientation.
- Verify every block with Arabic RTL and English LTR catalog data.
- Direction changes layout order only when the documented component prop requests it; `dir` alone controls reading direction.
