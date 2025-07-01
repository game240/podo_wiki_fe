import React, { useEffect, useState, type JSX } from "react";
import axiosClient from "../apis/axiosClient";
import type { JSONContent } from "@tiptap/react";
import externalLinkIcon from "../assets/ic_external_link.svg";

import { transformPlaceholders } from "../utils/transformPlaceholders";
import { transformToggles } from "../utils/transformToggles";

import "./WikiViewer.scss";

type Segment = JSONContent[];

// Recursive renderer for JSONContent nodes
function renderNode(node: JSONContent, key: number): React.ReactNode {
  const children = node.content
    ? node.content.map((child, idx) => renderNode(child, idx))
    : node.text;

  switch (node.type) {
    case "paragraph":
      return <p key={key}>{children}</p>;

    case "heading": {
      const level = (node.attrs?.level as number) ?? 1;
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return <Tag key={key}>{children}</Tag>;
    }

    case "bulletList":
      return <ul key={key}>{children}</ul>;
    case "orderedList":
      return <ol key={key}>{children}</ol>;
    case "listItem":
      return <li key={key}>{children}</li>;

    case "text": {
      let content: React.ReactNode = node.text;
      if (node.marks) {
        node.marks.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              content = <strong key={`${key}-bold`}>{content}</strong>;
              break;
            case "italic":
              content = <em key={`${key}-italic`}>{content}</em>;
              break;
            case "strike":
              content = <s key={`${key}-strike`}>{content}</s>;
              break;
            case "link": {
              const href =
                typeof mark.attrs?.href === "string" ? mark.attrs.href : "";
              content = (
                <a
                  key={`${key}-link`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
              break;
            }
            default:
              break;
          }
        });
      }
      return <React.Fragment key={key}>{content}</React.Fragment>;
    }

    case "image": {
      const src = (node.attrs?.src as string) ?? "";
      const alt = (node.attrs?.alt as string) ?? "";
      return <img key={key} src={src} alt={alt} style={{ maxWidth: "100%" }} />;
    }

    case "externalLinkPlaceholder": {
      const href = (node.attrs?.href as string) ?? "";
      const text = (node.attrs?.text as string) ?? children;
      return (
        <span key={key} className="inline-flex items-center">
          <img
            src={externalLinkIcon}
            alt="external-link"
            width={16}
            height={16}
            style={{ marginRight: 4, verticalAlign: "middle" }}
          />
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="wiki-external-link text-[var(--green)]"
          >
            {text}
          </a>
        </span>
      );
    }

    case "internalLinkPlaceholder": {
      const id = (node.attrs?.id as string) ?? "";
      const text = (node.attrs?.text as string) ?? children;
      return (
        <a
          key={key}
          href={`/page/${id}`}
          className="wiki-internal-link text-[var(--blue)]"
        >
          {text}
        </a>
      );
    }

    case "footnotePlaceholder": {
      const index = (node.attrs?.index as number) ?? undefined;
      return (
        <p key={key} className="inline text-[var(--blue)]">
          [{index}]
        </p>
      );
    }

    // Fallback for bracket/paren nodes
    case "bracket":
    case "blueBracket":
    case "paren":
    case "equals":
      return <span key={key}>{children}</span>;

    default:
      return <React.Fragment key={key}>{children}</React.Fragment>;
  }
}

export default function WikiViewer() {
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        const { data } = await axiosClient.get("/page/page1.json");
        const raw = data.content as { type: string; content: JSONContent[] };

        // 1) placeholder 변환 → 2) ==…== 토글 처리
        const flatContent: JSONContent[] = raw.content.flatMap((block) => {
          const inlined = transformPlaceholders(block.content || []);
          return transformToggles(inlined);
        });

        // 3) 'details' 기준으로 세그먼트 분할
        const segs: Segment[] = [];
        let buffer: JSONContent[] = [];

        flatContent.forEach((node) => {
          if (node.type === "details") {
            if (buffer.length) {
              segs.push(buffer);
              buffer = [];
            }
            segs.push([node]);
          } else {
            buffer.push(node);
          }
        });
        if (buffer.length) segs.push(buffer);

        setSegments(segs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWiki();
  }, []);

  return (
    <div className="wiki-viewer">
      {segments.map((nodes, idx) => {
        // Check if this segment is a details section
        if (nodes.length === 1 && nodes[0].type === "details") {
          const detailNode = nodes[0];
          const [summaryNode, ...rest] = detailNode.content || [];
          const summaryContent = summaryNode.content?.map((n, i) =>
            renderNode(n, i)
          );
          const detailBody = rest.map((n, i) => renderNode(n, i));
          // Compute the sequential number of this details section
          const detailNumber =
            segments
              .slice(0, idx)
              .filter((seg) => seg.length === 1 && seg[0].type === "details")
              .length + 1;

          return (
            <section className="wiki-viewer__section" key={idx}>
              <h3 className="wiki-viewer__section-title text-start">
                {detailNumber}. {summaryContent}
              </h3>
              <hr />
              <div className="wiki-viewer__section-body">{detailBody}</div>
            </section>
          );
        }

        // 일반 블록 세그먼트
        return (
          <div className="wiki-viewer__segment" key={idx}>
            {nodes.map((n, i) => renderNode(n, i))}
          </div>
        );
      })}
    </div>
  );
}
