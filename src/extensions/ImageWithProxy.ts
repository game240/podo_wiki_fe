import Image from "@tiptap/extension-image";

export const ImageWithProxy = Image.extend({
  name: "image", // 기본 Image 노드를 덮어씁니다
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
