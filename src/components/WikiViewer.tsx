// src/components/WikiViewer.tsx
import { useEffect } from "react";
import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { FootnotePlaceholder } from "../extensions/FootnotePlaceholder";
import { Bracket, BlueBracket } from "../extensions/Bracket";
import { Paren } from "../extensions/Paren";
import axiosClient from "../apis/axiosClient";
import { ExternalLinkPlaceholder } from "../extensions/viewer/ExternalLinkPlaceholder";
import { InternalLinkPlaceholder } from "../extensions/viewer/InternalLinkPlaceholder";
import { transformPlaceholders } from "../utils/transformPlaceholders.ts";

type WikiViewerProps = {
  content?: object; // ProseMirror JSON
};

export default function WikiViewer({ content }: WikiViewerProps) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      LinkExtension.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "wiki-link",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image,
      ExternalLinkPlaceholder,
      InternalLinkPlaceholder,
      FootnotePlaceholder,
      Bracket,
      Paren,
      BlueBracket,
    ],
    content,
  });

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        const { data } = await axiosClient.get("/page/page1.json");
        // data.content === { type: "doc", content: [...] }
        const rawDoc = data.content;
        const transformedDoc = {
          ...rawDoc,
          content: rawDoc.content.map((param: JSONContent) => ({
            ...param,
            content: transformPlaceholders(param.content || []),
          })),
        };
        editor?.commands.setContent(transformedDoc);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWiki();
  }, [editor]);

  return <EditorContent editor={editor} />;
}
