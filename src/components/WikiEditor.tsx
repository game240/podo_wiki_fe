import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import LinkExtension from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { InternalLinkPlaceholder } from "../extensions/InternalLinkPlaceholder";
import { FootnotePlaceholder } from "../extensions/FootnotePlaceholder";
import { useEffect, useState, useMemo } from "react";
import { BracketExit } from "../extensions/brackets/BracketExit";
import { AxiosError } from "axios";
import axiosClient from "../apis/axiosClient";
import { LineNumbers } from "../extensions/LineNumbers";
import { CompositionGuard } from "../extensions/CompositionGuard";
import { ClearStoredMarks } from "../extensions/ClearStoredMark";
import { BlueBracket, Bracket } from "../extensions/brackets/Bracket";
import { Paren } from "../extensions/brackets/Paren";
import { Equals } from "../extensions/brackets/Equals";
import { ImageWithProxy } from "../extensions/ImageWithProxy";

interface FootnoteItem {
  id: string;
  content: string;
}

export default function WikiEditor() {
  const [initialContent, setInitialContent] = useState<JSONContent | null>(
    null
  );

  const editor = useEditor({
    extensions: [
      CompositionGuard,
      StarterKit,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      ImageWithProxy.configure({ inline: false, allowBase64: true }),
      Bracket,
      BlueBracket,
      Paren,
      Equals,
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
    content: initialContent || "",
  });

  // 각주 목록을 에디터 문서 상태에서 직접 읽어옵니다
  const footnotes = useMemo<FootnoteItem[]>(() => {
    if (!editor) return [];
    const items: FootnoteItem[] = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === "footnotePlaceholder") {
        items.push({
          id: node.attrs.id,
          content: node.attrs.content,
        });
      }
    });
    return items;
  }, [editor?.state.doc]);

  // 페이지 편집 초기 컨텐츠 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get(`/page/page1.json`);
        setInitialContent(data.content);
      } catch (error) {
        console.error("컨텐츠 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  // initialContent가 설정되면 에디터에 로드
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  // 주석 업데이트: 노드 attrs에 content 반영
  const updateFootnoteContent = (id: string, newContent: string) => {
    if (!editor) return;
    editor
      .chain()
      .command(({ tr, state }) => {
        state.doc.descendants((node, pos) => {
          if (
            node.type.name === "footnotePlaceholder" &&
            node.attrs.id === id
          ) {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              content: newContent,
            });
          }
        });
        return true;
      })
      .run();
  };

  // API 호출
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);
    try {
      const doc = editor.getJSON();
      const res = await axiosClient.post("/save", {
        filename: "page1.json",
        content: doc,
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
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                placeholder="여기를 클릭하여 각주 내용을 입력하세요"
                value={fn.content}
                onChange={(e) => updateFootnoteContent(fn.id, e.target.value)}
              />
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
