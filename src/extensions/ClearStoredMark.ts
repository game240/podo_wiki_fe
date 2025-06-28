import { Plugin } from "prosemirror-state";
import { Extension } from "@tiptap/core";

export const ClearStoredMarks = Extension.create({
  name: "clearStoredMarks",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            compositionstart: (view) => {
              // IME 조합 시작 직전에 storedMarks를 비웁니다
              view.dispatch(view.state.tr.setStoredMarks([]));
              return false;
            },
          },
        },
      }),
    ];
  },
});

export default ClearStoredMarks;
