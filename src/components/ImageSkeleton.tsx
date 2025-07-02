// components/ImageSkeleton.tsx
import { useState, useEffect } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ImageSkeleton({ node }: NodeViewProps) {
  const { src, alt } = node.attrs as { src: string; alt?: string };
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 매번 src가 바뀔 때마다 로딩 플래그 초기화
    setLoaded(false);
    if (!src) return;

    // 프리로더로 로드 상태 감지
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // 에러 시에도 skeleton 제거

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <NodeViewWrapper className="image-node" style={{ position: "relative" }}>
      {/* 아직 로드되지 않았으면 스켈레톤만 */}
      {!loaded && <Skeleton width={600} height={400} />}

      {/* 로드 완료되었을 때만 실제 <img> 태그를 렌더링 */}
      {loaded && (
        <img
          src={`${
            import.meta.env.VITE_SERVER_URL
          }/api/image-proxy?path=${encodeURIComponent(src)}`}
          alt={alt}
        />
      )}
    </NodeViewWrapper>
  );
}
