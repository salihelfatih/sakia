import { useEffect, useRef, useCallback } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useInView, IntersectionOptions } from "react-intersection-observer";
import type { SectionName } from "@/lib/types";

export function useSectionInView(sectionName: SectionName, threshold = 0.5) {
  const { setActiveSection, setSectionRef } = useActiveSectionContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const options: IntersectionOptions = {
    threshold,
    triggerOnce: false,
  };

  const [inViewRef, inView] = useInView(options);

  const combinedRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        inViewRef(node);
        setSectionRef(sectionName, { current: node });
      }
    },
    [inViewRef, sectionName, setSectionRef]
  );

  useEffect(() => {
    if (inView) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setActiveSection(sectionName);
      }, 300);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView, setActiveSection, sectionName]);

  return combinedRef;
}