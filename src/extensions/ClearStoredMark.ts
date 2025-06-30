import { Plugin, TextSelection } from "prosemirror-state";
import { Extension } from "@tiptap/core";
import type { Mark } from "prosemirror-model";

export const ClearStoredMarks = Extension.create({
  name: "clearStoredMarks",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            compositionstart: (view) => {
              const { state } = view;

              // 1) readonly Mark[] 타입으로 선언
              let marks: readonly Mark[] = state.storedMarks ?? [];

              // 2) storedMarks가 없으면 커서 위치의 marks 가져오기
              if (
                marks.length === 0 &&
                state.selection instanceof TextSelection &&
                state.selection.$cursor
              ) {
                marks = state.selection.$cursor.marks();
              }

              // 3) textStyle 마크만 걸러내기
              const filtered = marks.filter(
                (mark) => mark.type !== state.schema.marks.textStyle
              );

              // 4) 필터링된 마크로 재설정
              view.dispatch(state.tr.setStoredMarks(filtered));

              return false;
            },
          },
        },
      }),
    ];
  },
});
