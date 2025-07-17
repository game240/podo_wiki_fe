import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey, EditorState, Transaction } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

// 플러그인 키 정의
const footnotePluginKey = new PluginKey("autoNumberFootnotes");

// 자동 번호 매김 플러그인
const footnotePlugin = new Plugin({
  key: footnotePluginKey,
  state: {
    // 초기 로드 시 전체 문서를 스캔해 decoration 생성
    init(_config: unknown, state: EditorState): DecorationSet {
      const deco: Decoration[] = [];
      let idx = 1;
      state.doc.descendants((node, pos) => {
        if (node.type.name === "footnotePlaceholder") {
          deco.push(
            Decoration.node(
              pos,
              pos + node.nodeSize,
              { "data-footnote": String(idx) },
              { key: `fn-${idx}` }
            )
          );
          idx++;
        }
      });
      return DecorationSet.create(state.doc, deco);
    },
    // 문서 변경 시 다시 스캔
    apply(
      tr: Transaction,
      oldDeco: DecorationSet,
      _oldState: EditorState,
      newState: EditorState
    ): DecorationSet {
      if (!tr.docChanged) {
        return oldDeco;
      }
      const deco: Decoration[] = [];
      let idx = 1;
      newState.doc.descendants((node, pos) => {
        if (node.type.name === "footnotePlaceholder") {
          deco.push(
            Decoration.node(
              pos,
              pos + node.nodeSize,
              { "data-footnote": String(idx) },
              { key: `fn-${idx}` }
            )
          );
          idx++;
        }
      });
      return DecorationSet.create(newState.doc, deco);
    },
  },
  props: {
    decorations(state: EditorState): DecorationSet {
      return (
        this as unknown as { getState(state: EditorState): DecorationSet }
      ).getState(state);
    },
  },
});

// FootnotePlaceholder 노드 + 플러그인 결합
export const FootnotePlaceholder = Node.create({
  name: "footnotePlaceholder",
  group: "inline",
  inline: true,
  atom: false,
  content: "inline*",
  marks: "_",
  addAttributes() {
    return {
      id: { default: "1" }, // 기본 인덱스값
      content: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: "span[data-footnote]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-footnote": HTMLAttributes.id,
        class: "footnote",
        style: "color: #0275D8;",
      }),
      // `[${HTMLAttributes.id}]`,
      `\u00A0\u00A0\u00A0\u00A0`,
    ];
  },
  addProseMirrorPlugins(): Plugin[] {
    return [footnotePlugin];
  },
});
