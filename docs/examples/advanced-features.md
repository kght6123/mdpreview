# Advanced Markdown Features

This document showcases advanced markdown features supported by mdpreview.

## Blockquotes

> This is a simple blockquote.

> This is a blockquote with multiple paragraphs.
>
> It can contain multiple lines and paragraphs.

> ### Nested Blockquote
> 
> You can also nest blockquotes:
> 
> > This is a nested blockquote.
> > It appears indented.

## Horizontal Rules

You can create horizontal rules using three or more hyphens, asterisks, or underscores:

---

***

___

## Links

### Basic Links

- [GitHub](https://github.com)
- [mdpreview Repository](https://github.com/kght6123/mdpreview)
- [Markdown Guide](https://www.markdownguide.org)

### Reference-style Links

This is [an example][1] of a reference-style link.

You can also use [numbers][1] or [text][link-text] as references.

[1]: https://example.com
[link-text]: https://www.markdownguide.org

### Automatic Links

<https://www.example.com>  
<email@example.com>

## Emphasis

- *italic text* or _italic text_
- **bold text** or __bold text__
- ***bold and italic*** or ___bold and italic___
- ~~strikethrough text~~

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item 2.2.1
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Mixed Lists

1. Ordered item 1
   - Unordered nested item
   - Another unordered item
2. Ordered item 2
   1. Ordered nested item
   2. Another ordered nested item

## Code

### Inline Code

Use backticks for `inline code` in your text.

You can also include code variables like `const x = 10` or commands like `npm install`.

### Code Blocks with Language Specification

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

#### CSS

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;
}

.card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### JSON

```json
{
  "name": "mdpreview",
  "version": "1.0.0",
  "description": "Markdown Preview Tool",
  "author": "kght6123",
  "license": "MIT"
}
```

#### Shell

```bash
#!/bin/bash

# Build the project
npm run build

# Run tests
npm test

# Deploy
npm run deploy
```

## Images

Images would be displayed here if we had image files:

```markdown
![Alt text](./image.png)
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

## Escaping Characters

You can escape special characters:

\* Not italic \*  
\# Not a heading  
\- Not a list item  

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

## Emoji (if supported)

:smile: :rocket: :heart: :+1: :tada:

Note: Emoji support depends on the renderer configuration.
