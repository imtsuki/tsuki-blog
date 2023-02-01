'use client';

import { useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { annotate } from 'rough-notation';

export type AnnotationProps = JSX.IntrinsicElements['span'] & {
  type: 'box' | 'circle' | 'highlight' | 'underline';
};

export const Annotation = ({ type, children }: AnnotationProps) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const annotationRef = useRef<ReturnType<typeof annotate>>();

  const color = {
    box: 'green',
    circle: 'crimson',
    highlight: 'rgba(255, 215, 0, 25%)',
    underline: 'dodgerblue',
  }[type];

  const { ref: inViewRef } = useInView({
    root: null,
    rootMargin: '0% 0% -25% 0%',
    threshold: 0.5,
    triggerOnce: true,
    onChange: (inView) => {
      if (inView && elementRef.current) {
        let annotation = annotate(elementRef.current, {
          type,
          color,
          strokeWidth: 2,

          multiline: true,
        });
        annotationRef.current = annotation;
        annotation.show();
      }
    },
  });

  const setRef = useCallback(
    (node: HTMLElement) => {
      elementRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  return <span ref={setRef}>{children}</span>;
};
