import type { Editor } from "@tiptap/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

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
    </div>
  );
};

export default MenuBar;
