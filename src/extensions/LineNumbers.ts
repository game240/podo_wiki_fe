/* src/extensions/LineNumbers.ts */
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const LineNumbers = Extension.create({
  name: "lineNumbers",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("lineNumbers"),
        props: {
          decorations(state) {
            const { doc } = state;
            const widgets: Decoration[] = [];
            let line = 1;

            // 모든 블록 노드를 순회
            doc.descendants((node, pos) => {
              if (node.isBlock) {
                // node.from ~ node.to 까지 Decoration.node 로 data-line 추가
                widgets.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    "data-line": String(line),
                  })
                );
                line++;
              }
            });

            return DecorationSet.create(doc, widgets);
          },
        },
      }),
    ];
  },
});
