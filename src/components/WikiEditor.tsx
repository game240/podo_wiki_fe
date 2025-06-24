import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import LinkExtension from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { InternalLinkPlaceholder } from "../extensions/InternalLinkPlaceholder";
import { FootnotePlaceholder } from "../extensions/FootnotePlaceholder";

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
