// src/utils/transformToggles.ts
import type { JSONContent } from "@tiptap/react";

export function transformToggles(nodes: JSONContent[]): JSONContent[] {
  const result: JSONContent[] = [];
  let i = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    // === 열기 마커 발견 ===
    if (node.type === "equals" && node.attrs?.type === "open") {
      // ① summary 텍스트 수집
      const summary: JSONContent[] = [];
      let j = i + 1;
      while (
        j < nodes.length &&
        !(nodes[j].type === "equals" && nodes[j].attrs?.type === "close")
      ) {
        summary.push(nodes[j]);
        j++;
      }
      // close 마커 건너뛰기
      j++;

      // ② detail 영역 수집 (다음 ==열기== 전까지)
      const detail: JSONContent[] = [];
      while (
        j < nodes.length &&
        !(nodes[j].type === "equals" && nodes[j].attrs?.type === "open")
      ) {
        detail.push(nodes[j]);
        j++;
      }

      // ③ details 구조 삽입
      result.push({
        type: "details",
        attrs: { open: false },
        content: [{ type: "summary", content: summary }, ...detail],
      });

      i = j;
    } else {
      // === 일반 노드 ===
      result.push(node);
      i++;
    }
  }

  return result;
}
