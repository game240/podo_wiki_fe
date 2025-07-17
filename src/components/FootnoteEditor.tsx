import TextStyle from "@tiptap/extension-text-style";
import {
  Editor,
  EditorContent,
  useEditor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import LinkExtension from "@tiptap/extension-link";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { CompositionGuard } from "../extensions/CompositionGuard";
import { BlueBracket, Bracket } from "../extensions/brackets/Bracket";
import { Paren } from "../extensions/brackets/Paren";
import { Equals } from "../extensions/brackets/Equals";
import { ClearStoredMarks } from "../extensions/ClearStoredMark";
import { BracketExit } from "../extensions/brackets/BracketExit";
import "./FootnoteEditor.scss";

export interface FootnoteEditorProps {
  id: string;
  content: JSONContent[];
  updateFootnoteContent: (id: string, newContent: JSONContent[]) => void;
  setActiveEditor: Dispatch<SetStateAction<Editor | null>>;
}
const FootnoteEditor = ({
  id,
  content,
  updateFootnoteContent,
  setActiveEditor,
}: FootnoteEditorProps) => {
  const initial = Array.isArray(content) ? { type: "doc", content } : content;

  const editor = useEditor({
    extensions: [
      CompositionGuard,
      StarterKit,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Bracket,
      BlueBracket,
      Paren,
      Equals,
      ClearStoredMarks,
      LinkExtension.configure({ HTMLAttributes: { class: "wiki-link" } }),
      BracketExit,
    ],
    content: initial,
    onUpdate({ editor }) {
      updateFootnoteContent(id, editor.getJSON().content || []);
    },
  });

  // ① prop으로 받은 content가 바뀔 때마다 에디터에도 반영
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(content);
  }, [content, editor]);

  // ② 포커스 시 상단 툴바가 이 에디터에 적용되도록
  useEffect(() => {
    if (!editor) return;
    editor.on("focus", () => setActiveEditor(editor!));
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="footnote-editor-wrapper w-full">
      <EditorContent editor={editor} />
    </div>
  );
};

export default FootnoteEditor;
