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
import { useState } from "react";

interface FootnoteItem {
  id: string;
  content: string;
}

export default function WikiEditor() {
  const [footnotes, setFootnotes] = useState<FootnoteItem[]>([]);

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
      const items: FootnoteItem[] = [];
      let i = 1;
      editor.state.doc.descendants((node) => {
        if (node.type.name === "footnotePlaceholder") {
          items.push({ id: String(i), content: "" });
          i++;
        }
      });
      setFootnotes(items);

      // Debug
      const markdown = editor.storage.markdown.getMarkdown();
      console.log(markdown);
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />

      <div className="footnotes-list">
        <hr />
        <h4>각주</h4>
        <ol className="flex flex-col gap-2">
          {footnotes.map((fn) => (
            <li key={fn.id} className="flex items-center gap-2">
              <span className="text-[#0275D8]">[{fn.id}]</span>
              {fn.content || (
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  placeholder="여기를 클릭하여 각주 내용을 입력하세요"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
