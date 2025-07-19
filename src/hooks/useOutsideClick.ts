import { useEffect, useState, type RefObject } from "react";

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement | null>;
  additionalRefs?: RefObject<HTMLElement | null>[];
}

/**
 * component 외부 클릭 여부 감지
 * @param {Object} props
 * @param {RefObject<HTMLElement | null>} props.ref - 컴포넌트의 ref
 * @param {RefObject<HTMLElement | null>[]} [props.additionalRefs] - 추가적으로 '내부'라고 판단할 요소 ref 배열
 * @returns {Object} - isOutside state
 */
const useOutsideClick = ({
  ref,
  additionalRefs = [],
}: UseOutsideClickProps) => {
  const [isOutside, setIsOutside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    let isInside = false;

    if (ref.current && ref.current.contains(event.target as Node)) {
      isInside = true;
    }

    for (const additionalRef of additionalRefs) {
      if (
        additionalRef.current &&
        additionalRef.current.contains(event.target as Node)
      ) {
        isInside = true;
        break;
      }
    }

    if (isInside) {
      setIsOutside(false);
    } else {
      setIsOutside(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, additionalRefs]);

  return { isOutside };
};

export default useOutsideClick;
