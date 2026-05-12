import sanitizeHtml from "sanitize-html";

export function sanitizeText(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  })
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizePhone(input: string) {
  return input.replace(/[^\d+]/g, "").trim();
}

export function sanitizeRichHtml(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "blockquote",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "h4",
      "a",
      "img",
      "figure",
      "figcaption",
      "code",
      "pre"
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }, true),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }, true)
    }
  });
}

export function safeJsonLd<T>(value: T) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}
