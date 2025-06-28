import { Node, mergeAttributes } from "@tiptap/core";
import { ALLOWED_EXTERNAL_COLOR } from "../../constants/allowLinkColor";

export const ExternalLinkPlaceholder = Node.create({
  name: "externalLinkPlaceholder",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      text: { default: "" },
      href: { default: "" },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        href: node.attrs.href,
        target: "_blank",
        rel: "noopener noreferrer",
        style: `color: ${ALLOWED_EXTERNAL_COLOR};`,
      }),
      node.attrs.text,
    ];
  },
});
