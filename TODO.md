# TODO

## top
- add onComplete vs onCancel (and onCreate, onRender, onHide, onDestroy)
- add back es modules
- some tests!
- `styles` option (in core-base)
- preloading & postloading states (in core-base)
- take all relevant functionality from `dialog-polyfill` & sweetalerts
  - tab-key trap

## tricky questions

- examples: show original source code, but execute compiled code
  - https://github.com/babel/babel/issues/5085#issuecomment-374903233 (separate babel configs (build vs build-examples) if necessary)
- include helpers on class constructor?

## community maintenance
- open issue for @babel/plugin-proposal-class-properties re:
  Uncaught TypeError: attempted to use private field on non-instance \n at _classPrivateFieldLooseBase
  *and*
  Uncaught TypeError: attempted to set private field on non-instance \n at _classPrivateFieldSet

# so much to do!

- jest power-assert?
- add stylelinting
- rename package to "dialogplus"
- test coverage
- badge with https://badgen.net/
- travis CI
- semantic-release
- github pages (or other host for examples-dist)
- test on various browsers

# future

- split into multiple repos
  - dialogplus (this repo, the kitchen sink)
  - dialogplus-core
  - dialogplus-plugin-icons
  - dialogplus-plugin-buttons
  - dialogplus-plugin-inputs
  - dialogplus-plugin-animation ?
  - dialogplus-plugin-timer
  - dialogplus-plugin-queue
