# Dotion Two-Page Design

## Goal

Separate Dotion's marketing experience from its editor workspace so the product
has two actual HTML pages instead of hidden views inside one document.

## Page Structure

### `Dotion.html`

Contains:

- Landing navigation and hero
- Landing template previews
- Features and testimonials
- Template gallery view
- Landing and template-specific JavaScript

Does not contain:

- `#workspace-page`
- Workspace sidebar, editor, settings panel, or workspace state handlers

### `DotionWorkspace.html`

Contains:

- The existing Dotion editor workspace
- Sidebar, document canvas, toolbar, settings, course mode, and editor behavior
- The same theme, typography, accent, and responsive styling currently used by
  the embedded workspace

Does not contain:

- Marketing hero, features, testimonials, or template gallery

## Navigation

The following explicit product CTAs open `DotionWorkspace.html`:

- Landing navigation: `Open App`
- Landing hero: `Start writing free`
- Template gallery top bar: `Open App`

The following elements do not open the workspace:

- Landing template preview cards
- Template gallery cards
- `Use Template` buttons

Landing template preview cards continue to open the template gallery. Template
gallery cards and `Use Template` buttons remain visual demo controls without
navigation.

The workspace logo returns to `Dotion.html`. Browser back navigation also works
naturally because page transitions use ordinary links instead of hidden-view
JavaScript.

## Shared State

The existing `localStorage` keys for theme, accent, and document font remain
unchanged. This preserves preferences when moving between the landing and
workspace pages.

## Implementation Strategy

Preserve the current self-contained project convention:

- `Dotion.html` remains a standalone page with inline CSS and JavaScript.
- `DotionWorkspace.html` is also standalone with the workspace's required CSS,
  markup, and JavaScript.

This duplicates some design tokens and base styles, but avoids introducing a
new asset pipeline or shared-file dependency into a repository where each
project walkthrough is intentionally self-contained.

## Responsive Behavior

Both pages retain their current responsive rules:

- Landing content and template gallery continue to adapt at existing
  breakpoints.
- Workspace sidebar collapse, mobile expansion, editor padding, and settings
  behavior remain unchanged.

## Testing

Add a static regression test that verifies:

- `Dotion.html` has no `#workspace-page`.
- `DotionWorkspace.html` contains the workspace.
- All three approved CTAs link to `DotionWorkspace.html`.
- No template preview, template card, or `Use Template` control opens the
  workspace.
- The workspace logo links back to `Dotion.html`.

Render and inspect:

- Landing desktop and mobile
- Workspace desktop and mobile
- Landing `Open App` to workspace
- Landing `Start writing free` to workspace
- Template navigation without entering the workspace
