import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import LinkExtension from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { InternalLinkPlaceholder } from "../extensions/InternalLinkPlaceholder";
import { FootnotePlaceholder } from "../extensions/FootnotePlaceholder";
import { useState } from "react";
import { BracketExit } from "../extensions/brackets/BracketExit";
import { AxiosError } from "axios";
import axiosClient from "../apis/axiosClient";
import { LineNumbers } from "../extensions/LineNumbers";
import { CompositionGuard } from "../extensions/CompositionGuard";
import { ClearStoredMarks } from "../extensions/ClearStoredMark";
import { BlueBracket, Bracket } from "../extensions/brackets/Bracket";
import { Paren } from "../extensions/brackets/Paren";

interface FootnoteItem {
  id: string;
  content: string;
}

export default function WikiEditor() {
  const [footnotes, setFootnotes] = useState<FootnoteItem[]>([]);

  const editor = useEditor({
    extensions: [
      CompositionGuard,
      StarterKit, // # / * / 1. 등 기본 input rule
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Image.configure({ inline: true }),
      Bracket,
      BlueBracket,
      Paren,
      ClearStoredMarks,
      LinkExtension.configure({
        HTMLAttributes: { class: "wiki-link" },
      }),
      // Markdown.configure({
      //   // 내부 AST ↔ Markdown 직렬화
      //   html: false, // 화면엔 HTML(렌더링)만, markdown 문법 노출X
      // }),
      InternalLinkPlaceholder,
      FootnotePlaceholder,
      BracketExit,
      LineNumbers,
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
      // const markdown = editor.storage.markdown.getMarkdown();
      // console.log(markdown);
    },
  });

  // API 호출
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);
    try {
      // HTML 대신 JSON 문서 구조를 꺼냅니다.
      const doc = editor.getJSON();

      const res = await axiosClient.post("/save", {
        filename: "page1.json",
        content: doc, // content 필드에 JS 객체(JSON)
        meta: {
          title: "My Wiki Page",
          updatedAt: new Date().toISOString(),
          author: "junhyeok",
        },
      });
      setMessage(`✅ 저장 성공: ${res.data.path}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errMsg =
          error.response?.data?.message ||
          error.message ||
          "알 수 없는 오류가 발생했습니다.";
        setMessage(`❌ 저장 실패: ${errMsg}`);
      } else {
        setMessage(`❌ 저장 실패: ${error}`);
      }
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <MenuBar editor={editor} />
      <div className="editor-wrapper pl-4">
        <EditorContent editor={editor} />
      </div>

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
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: saving ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "저장 중..." : "페이지 저장"}
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "0.5rem",
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
