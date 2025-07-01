import type { Editor } from "@tiptap/react";
import externalLinkIcon from "../assets/ic_external_link.svg";
import { BoldIcon, ItalicIcon, StrikeIcon } from "../assets/editor/EditorIcons";

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
    <div className="flex items-center justify-end gap-2 mb-2">
      <button
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().toggleBold().run()}
      >
        <BoldIcon color={editor.isActive("bold") ? "black" : ""} />
      </button>
      <button
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().toggleStrike().run()}
      >
        <StrikeIcon color={editor.isActive("strike") ? "black" : ""} />
      </button>
      <button
        className="cursor-pointer"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().toggleItalic().run()}
      >
        <ItalicIcon color={editor.isActive("italic") ? "black" : ""} />
      </button>
      <button className="cursor-pointer" onClick={insertFootnote}>
        각주
      </button>
      <button className="cursor-pointer" onClick={insertExternalLink}>
        외부 링크
      </button>
      <button className="cursor-pointer" onClick={insertInternalLink}>
        위키 링크
      </button>
      <button className="cursor-pointer" onClick={insertParagraph}>
        문단 추가
      </button>
    </div>
  );
};

export default MenuBar;
