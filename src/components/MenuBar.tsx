import type { Editor } from "@tiptap/react";
import externalLinkIcon from "../assets/ic_external_link.svg";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const insertExternalLink = () => {
    // 1) 초록색 스타일로 []() 삽입 → 2) 텍스트 스타일 언마크 → 3) 커서 괄호 안으로 이동
    editor
      .chain()
      .focus()

      .setImage({
        src: externalLinkIcon,
        alt: "external-link",
        title: "external-link",
      })

      .insertContent({ type: "bracket", attrs: { type: "open" } })

      .insertContent([{ type: "text", text: "텍스트" }])

      .insertContent({ type: "bracket", attrs: { type: "close" } })

      .insertContent({ type: "paren", attrs: { type: "open" } })

      .insertContent([{ type: "text", text: "외부 링크" }])

      .insertContent({ type: "paren", attrs: { type: "close" } })
      .run();

    editor.view.dispatch(editor.state.tr.setStoredMarks([]));

    const { to } = editor.state.selection; // to는 방금 삽입된 끝 위치
    editor
      .chain()
      .focus()
      .setTextSelection(to) // ')' 바로 앞 자리에 커서 고정
      .run();
  };

  const insertFootnote = () => {
    editor.chain().focus().insertContent({ type: "footnotePlaceholder" }).run();
  };

  const insertInternalLink = () => {
    editor
      .chain()
      .focus()
      .insertContent({ type: "blueBracket", attrs: { type: "open" } })

      .insertContent([{ type: "text", text: "내부 링크" }])

      .insertContent({ type: "blueBracket", attrs: { type: "close" } })
      .run();
  };

  // 문단 제목
  const insertParagraph = () => {
    editor
      .chain()
      .focus()
      .insertContent({ type: "equals", attrs: { type: "open" } })
      .insertContent([{ type: "text", text: "문단 제목" }])
      .insertContent({ type: "equals", attrs: { type: "close" } })
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
      <button onClick={insertExternalLink} style={{ marginLeft: 8 }}>
        Link
      </button>
      <button onClick={insertFootnote} style={{ marginLeft: 8 }}>
        각주
      </button>
      <button onClick={insertInternalLink} style={{ marginLeft: 8 }}>
        Internal Link
      </button>
      <button onClick={insertParagraph} style={{ marginLeft: 8 }}>
        Paragraph
      </button>
    </div>
  );
};

export default MenuBar;
