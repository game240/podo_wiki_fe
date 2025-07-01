// extensions/Bracket.ts
import { Node, mergeAttributes } from "@tiptap/core";

export const Bracket = Node.create({
  name: "bracket",
  inline: true,
  group: "inline",
  atom: true,
  addAttributes() {
    return {
      type: { default: "open" }, // 'open' | 'close'
    };
  },
  parseHTML() {
    return [{ tag: "span[data-bracket]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const char = HTMLAttributes.type === "open" ? "[" : "]";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-bracket": HTMLAttributes.type,
        style: "color: #009900; user-select: none;",
      }),
      char,
    ];
  },
});

export const BlueBracket = Node.create({
  name: "blueBracket",
  inline: true,
  group: "inline",
  atom: true,
  addAttributes() {
    return {
      type: { default: "open" }, // 'open' | 'close'
    };
  },
  parseHTML() {
    return [{ tag: "span[data-blue-bracket]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const char = HTMLAttributes.type === "open" ? "[" : "]";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-blue-bracket": HTMLAttributes.type,
        style: "color: #0275D8; user-select: none;",
      }),
      char,
    ];
  },
});
