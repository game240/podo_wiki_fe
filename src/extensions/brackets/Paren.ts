// extensions/Paren.ts
import { Node, mergeAttributes } from "@tiptap/core";

export const Paren = Node.create({
  name: "paren",
  inline: true,
  group: "inline",
  atom: true,
  addAttributes() {
    return {
      type: { default: "open" }, // 'open' | 'close'
    };
  },
  parseHTML() {
    return [{ tag: "span[data-paren]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const char = HTMLAttributes.type === "open" ? "(" : ")";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-paren": HTMLAttributes.type,
        style: "color: #009900; user-select: none;",
      }),
      char,
    ];
  },
});
