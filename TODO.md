# TODO

## top
- add onComplete vs onCancel (and onCreate & onRender)
- add back es modules
- `styles` option
- preloading state (in core-base)

## tricky questions

- examples: show original source code, but execute compiled code
  - https://github.com/babel/babel/issues/5085#issuecomment-374903233 (separate babel configs (build vs build-examples) if necessary)
- solve css injection order uncertainty
  - create high-level API for plugins to provide css text
  - uncertainty = order by import order? or by plugin install order? or by plugin install order of *first firing* (current)?
  - somehow give each instance an isolated css-selector scope and apply plugin styles inside it???
  - ... manage mounted <style> elements???
- include helpers on class constructor?

## community maintenance
- open issue for @babel/plugin-proposal-class-properties re:
  Uncaught TypeError: attempted to use private field on non-instance \n at _classPrivateFieldLooseBase
  *and*
  Uncaught TypeError: attempted to set private field on non-instance \n at _classPrivateFieldSet

# so much to do!

- add stylelinting
- rename package to "dialogplus"
- take all relevant functionality from https://github.com/GoogleChrome/dialog-polyfill
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
  - dialogplus-plugin-timer
  - dialogplus-plugin-queue
