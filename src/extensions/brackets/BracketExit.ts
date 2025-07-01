// extensions/BracketExit.ts
import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export const BracketExit = Extension.create({
  name: "bracketExit",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          //   handleTextInput: (view, from, to, text) => {
          handleTextInput: (view) => {
            const { state } = view;
            const { $from } = state.selection;
            const nodeBefore = $from.nodeBefore;

            // 커서 바로 앞 텍스트 노드의 마지막 글자가 ')' 또는 ']' 이면
            if (
              nodeBefore &&
              nodeBefore.isText &&
              /[)\]]$/.test(nodeBefore.text || "")
            ) {
              // 다음에 입력될 글자에 적용될 stored marks 전부 지우기
              view.dispatch(state.tr.setStoredMarks([]));
            }
            // false를 리턴해야 원래 입력 로직이 계속 실행됩니다
            return false;
          },
        },
      }),
    ];
  },
});
