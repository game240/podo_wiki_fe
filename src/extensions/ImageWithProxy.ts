import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageSkeleton from "../components/ImageSkeleton";

export const ImageWithProxy = Image.extend({
  name: "image",
  addNodeView() {
    return ReactNodeViewRenderer(ImageSkeleton);
  },
  renderHTML({ node, HTMLAttributes }) {
    // DB에 저장된 키 꺼내기
    const fileKey = node.attrs.src as string;
    // 프록시 URL 생성
    const proxyUrl = `${
      import.meta.env.VITE_SERVER_URL
    }/api/image-proxy?path=${encodeURIComponent(fileKey)}`;
    // 기본 속성에 src만 바꿔서 반환
    return [
      "img",
      {
        ...HTMLAttributes,
        src: proxyUrl,
        alt: node.attrs.alt || null,
        title: node.attrs.title || null,
      },
    ];
  },
});
