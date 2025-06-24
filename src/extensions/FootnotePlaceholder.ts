// extensions/FootnotePlaceholder.ts
import { Node, mergeAttributes } from "@tiptap/core";

export const FootnotePlaceholder = Node.create({
  name: "footnotePlaceholder",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      index: { default: "1" }, // [1], [2] 같은 각주 번호
    };
  },
  parseHTML() {
    return [{ tag: "span[data-footnote]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-footnote": HTMLAttributes.index,
        style: "color: blue; cursor: pointer;",
      }),
      `[${HTMLAttributes.index}]`,
    ];
  },
});
