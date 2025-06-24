import type { Editor } from "@tiptap/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const insertLinkPlaceholder = () => {
    // 1) 초록색 스타일로 []() 삽입 → 2) 텍스트 스타일 언마크 → 3) 커서 괄호 안으로 이동
    editor
      .chain()
      .focus()
      // 1. 초록 텍스트 스타일 적용
      .setColor("green")
      // 2. 원시 텍스트 노드로 []() 삽입 (파싱 방지)
      .insertContent([{ type: "text", text: "[]()" }])
      .setTextSelection(editor.state.selection.from + 4)
      .unsetColor()
      .run();
  };

  const insertFootnote = () => {
    editor
      .chain()
      .focus()
      .setColor("blue")
      .insertContent([{ type: "text", text: "[]" }])
      .setTextSelection(editor.state.selection.from + 2)
      .unsetColor()
      .run();
  };

  const insertInternalLink = () => {
    editor
      .chain()
      .focus()
      .setColor("blue")
      .insertContent([{ type: "text", text: "[]" }])
      .setTextSelection(editor.state.selection.from + 2)
      .unsetColor()
      .run();
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().toggleBold().run()}
        style={{
          fontWeight: editor.isActive("bold") ? "bold" : "normal",
          marginRight: 4,
        }}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().toggleItalic().run()}
        style={{
          fontStyle: editor.isActive("italic") ? "italic" : "normal",
          marginRight: 4,
        }}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().toggleStrike().run()}
        style={{
          textDecoration: editor.isActive("strike") ? "line-through" : "none",
        }}
      >
        Strike
      </button>
      <button onClick={insertLinkPlaceholder} style={{ marginLeft: 8 }}>
        Link
      </button>
      <button onClick={insertFootnote} style={{ marginLeft: 8 }}>
        각주
      </button>
      <button onClick={insertInternalLink} style={{ marginLeft: 8 }}>
        Internal Link
      </button>
    </div>
  );
};

export default MenuBar;
