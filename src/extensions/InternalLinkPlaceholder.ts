// extensions/InternalLinkPlaceholder.ts
import { Node, mergeAttributes } from "@tiptap/core";

export const InternalLinkPlaceholder = Node.create({
  name: "internalLinkPlaceholder",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      page: { default: "" }, // [검색어]
    };
  },
  parseHTML() {
    return [{ tag: "span[data-internal]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-internal": HTMLAttributes.page,
        style: "color: green; cursor: pointer;",
      }),
      `[${HTMLAttributes.page}]`,
    ];
  },
});
