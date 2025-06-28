// 새로 만들기: src/extensions/CompositionGuard.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey, Transaction } from "prosemirror-state";

export const compositionKey = new PluginKey("compositionGuard");

export const CompositionGuard = Extension.create({
  name: "compositionGuard",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: compositionKey,
        state: {
          init: () => false,
          apply(tr: Transaction, prev: boolean) {
            const meta = tr.getMeta(compositionKey) as {
              composing?: boolean;
            } | null;
            return meta?.composing ?? prev;
          },
        },
        props: {
          handleDOMEvents: {
            compositionstart(view) {
              view.dispatch(
                view.state.tr.setMeta(compositionKey, { composing: true })
              );
              return false;
            },
            compositionend(view) {
              setTimeout(() => {
                view.dispatch(
                  view.state.tr.setMeta(compositionKey, { composing: false })
                );
              }, 0);
              return false;
            },
          },
        },
      }),
    ];
  },
});
