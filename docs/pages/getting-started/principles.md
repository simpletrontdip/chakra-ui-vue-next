---
title: Design Principles
description: Principles that keep Chakra's components fairly consistent
---

Chakra UI is established on principles that keep its components fairly
consistent. Understanding these concepts will help you better contribute to
Chakra UI.

Our goal is to design simple, composable components that cater to real-life UI
design problems. In order to do that, we developed a set of principles that help
us always be on that path.

- **Style Props:** All component styles can be overridden or extended via style
  props to reduce the use of `css` prop or `styled()`. Compose new components from `Box`.

- **Simplicity:** Strive to keep the component API fairly simple and show real
  world scenarios of using the component.

- **Composition:** Break down components into smaller parts with minimal props
  to keep complexity low, and compose them together. This will ensure that the
  styles and functionality are flexible and extensible.

- **Accessibility:** When creating a component, keep accessibility top of mind.
  This includes keyboard navigation, focus management, color contrast, voice
  over, and the correct `aria-*` attributes.

- **Dark Mode:** Make components dark mode compatible. Use `useColorMode` hook
  to handle styling. [Learn more about dark mode](#).

- **Naming Props:** We all know naming is the hardest thing in this industry.
  Generally, ensure a prop name is indicative of what it does. Boolean props
  should be named using auxiliary verbs such as `does`, `has`, `is` and
  `should`. For example, `Button` uses `isDisabled`, `isLoading`, etc.