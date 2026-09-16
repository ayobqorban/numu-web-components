# Responsive standard

Components are mobile-first, content-driven, and usable at mobile, tablet, desktop, and wide-desktop widths. Avoid fixed text heights and assumptions about title length.

`WebContainer` owns consistent inline padding and maximum width. `WebSection` owns vertical rhythm. Blocks use grid or flex layouts that collapse without changing their data contract. Media reserves space with dimensions or aspect ratio where possible.

Catalog verification uses representative widths around 375, 768, 1280, and 1536 pixels. Tests cover structural responsive classes; browser visual review verifies wrapping, overflow, focus, and zoom to 200%.
