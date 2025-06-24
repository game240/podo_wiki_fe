import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Image from "@tiptap/extension-image";
import { Node, nodeInputRule } from "@tiptap/core";
import MenuBar from "./MenuBar";
import LinkExtension from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { InternalLinkPlaceholder } from "../extensions/InternalLinkPlaceholder";
import { FootnotePlaceholder } from "../extensions/FootnotePlaceholder";

// 1) 커스텀 WikiLink 노드 정의
const WikiLink = Node.create({
  name: "wikiLink",
  group: "inline",
  inline: true,
  draggable: false,
  addAttributes() {
    return { page: { default: "" } };
  },
  parseHTML() {
    return [{ tag: "a[data-wiki]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["a", { "data-wiki": "", href: `/wiki/${HTMLAttributes.page}` }, 0];
  },
  addInputRules() {
    return [
      // [[Page|Label]] → wikiLink 노드
      nodeInputRule({
        find: /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/,
        type: this.type,
        getAttributes: (match) => ({
          page: match[1],
          label: match[2] ?? match[1],
        }),
      }),
    ];
  },
});

export default function WikiEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit, // # / * / 1. 등 기본 input rule
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      LinkExtension.configure({
        HTMLAttributes: { class: "wiki-link" },
      }),
      Markdown.configure({
        // 내부 AST ↔ Markdown 직렬화
        html: false, // 화면엔 HTML(렌더링)만, markdown 문법 노출X
      }),
      Image, // /image 업로드·삽입 기능
      WikiLink, // [[Page|Label]] 커스텀 링크
      InternalLinkPlaceholder,
      FootnotePlaceholder,
    ],
    content: "", // 초기 컨텐츠
    onUpdate({ editor }) {
      // 필요 시 Markdown 텍스트로 꺼내기
      const markdown = editor.storage.markdown.getMarkdown();
      console.log(markdown);
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
