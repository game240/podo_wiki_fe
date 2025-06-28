// src/utils/transformPlaceholders.ts
import type { JSONContent } from "@tiptap/react";

export const transformPlaceholders = (nodes: JSONContent[]): JSONContent[] => {
  const result: JSONContent[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    // 1) External 링크: image + [텍스트](URL)
    if (
      node.type === "image" &&
      nodes[i + 1]?.type === "bracket" &&
      nodes[i + 1].attrs?.type === "open" &&
      nodes[i + 2]?.type === "text" &&
      nodes[i + 3]?.type === "bracket" &&
      nodes[i + 3].attrs?.type === "close" &&
      nodes[i + 4]?.type === "paren" &&
      nodes[i + 4].attrs?.type === "open" &&
      nodes[i + 5]?.type === "text" &&
      nodes[i + 6]?.type === "paren" &&
      nodes[i + 6].attrs?.type === "close"
    ) {
      const text = nodes[i + 2].text;
      const href = nodes[i + 5].text;

      result.push({
        type: "externalLinkPlaceholder",
        attrs: { text, href },
      });
      i += 6;
      continue;
    }

    // 2) Internal 링크: [내부 링크]
    if (
      node.type === "blueBracket" &&
      node.attrs?.type === "open" &&
      nodes[i + 1]?.type === "text" &&
      nodes[i + 2]?.type === "blueBracket" &&
      nodes[i + 2].attrs?.type === "close"
    ) {
      const page = nodes[i + 1].text;

      result.push({
        type: "internalLinkPlaceholder",
        attrs: { page },
      });
      i += 2;
      continue;
    }

    // 3) 그 외 노드
    result.push(node);
  }

  return result;
};
