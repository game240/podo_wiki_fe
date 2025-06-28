import { Node, mergeAttributes } from "@tiptap/core";
import { ALLOWED_INTERNAL_COLOR } from "../../constants/allowLinkColor";

export const InternalLinkPlaceholder = Node.create({
  name: "internalLinkPlaceholder",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      page: { default: "" },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        href: `/${node.attrs.page}`,
        style: `color: ${ALLOWED_INTERNAL_COLOR};`,
      }),
      node.attrs.page,
    ];
  },
});
