import { Node, mergeAttributes } from "@tiptap/core";

export const Equals = Node.create({
  name: "equals",
  inline: true,
  group: "inline",
  atom: true,
  addAttributes() {
    return {
      type: { default: "open" }, // 'open' | 'close'
    };
  },
  parseHTML() {
    return [{ tag: "span[data-equals]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const char = HTMLAttributes.type === "open" ? "==" : "==";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-equals": HTMLAttributes.type,
        style: "color: #0275D8; user-select: none;",
      }),
      char,
    ];
  },
});
