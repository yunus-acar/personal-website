---
title: "Markdown Test Post"
date: "2024-11-18"
excerpt: "lorem ipsum dolar samet"
category: "tech"
---

# Welcome to the Markdown Test Post! 🎉

This post is designed to **test every major Markdown feature**. Below, you'll find various elements to ensure your blog renders Markdown correctly.

---

## 1. Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## 2. Emphasis

- _Italic_
- **Bold**
- **_Bold and Italic_**
- ~~Strikethrough~~
- **Markdown** supports `inline code`.

---

## 3. Lists

### Unordered List

- Item 1
  - Sub-item 1
  - Sub-item 2
- Item 2

### Ordered List

1. First
2. Second
   1. Sub-first
   2. Sub-second

---

## 4. Links

Here’s a [link to Google](https://google.com).

---

## 5. Images

![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

## 6. Blockquotes

> This is a blockquote.
>
> - You can even include lists inside a blockquote.

---

## 7. Tables

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |

---

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
  <!-- ... -->
</article>
```

## 8. Code Blocks

### Inline Code

Use `console.log('Hello, Markdown!')` for logging.

### Multi-line Code

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("Markdown");
```

```jsx
import React from "react";

export default function BlogPost({ content }) {
  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
```

```js
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}
sayHello("Markdown");
```

### Python Example

```python
def greet(name):
    print(f"Hello, {name}!")
greet("Markdown")
```

---

## 9. Horizontal Rules

---

## 10. Math Expressions (if `remark-math` is enabled)

Inline math: $E = mc^2$  
Block math:

$$
\int_a^b f(x)dx = F(b) - F(a)
$$

---

## 11. Task Lists

- [x] Write Markdown post
- [ ] Test Markdown in the blog
- [ ] Fix any rendering issues

---

## 12. Escaping Characters

Here’s how to escape characters:  
\- \* \_ \` \# \\

---

## 13. Emoji Support

Add some 🎉🔥💻 emojis to your blog!

---

### That’s it!

Test this Markdown file in your blog setup and ensure everything works perfectly. 🚀
