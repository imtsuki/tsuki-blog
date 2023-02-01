import { visit } from 'unist-util-visit';

import { AnnotationProps } from 'components/annotation';
import { CalloutProps } from 'components/callout';

export const exhaustiveVariants =
  <T extends unknown>() =>
  <U extends T[]>(
    array: U & ([T] extends [U[number]] ? unknown : 'missing array member(s)')
  ) =>
    array;

export const CALLOUT_TYPES = exhaustiveVariants<
  NonNullable<CalloutProps['type']>
>()(['note', 'info', 'tip', 'warning', 'danger']);

export const ANNOTATION_TYPES = exhaustiveVariants<
  NonNullable<AnnotationProps['type']>
>()(['box', 'circle', 'highlight', 'underline']);

const visitAnnotation = (node: any) => {
  if (node.type !== 'textDirective') return;

  const annotationType = node.name;

  node.type = 'mdxJsxTextElement';
  node.name = 'Annotation';
  node.attributes = [
    { type: 'mdxJsxAttribute', name: 'type', value: annotationType },
  ];
};

const visitCallout = (node: any) => {
  if (node.type !== 'containerDirective') return;

  const calloutType = node.name;

  node.type = 'mdxJsxFlowElement';
  node.name = 'Callout';
  node.attributes = [
    { type: 'mdxJsxAttribute', name: 'type', value: calloutType },
  ];
};

export const remarkTransformDirectives = () => {
  // annotating types here causes TypeScript language server to lag
  const transformer = (tree: any) => {
    visit(tree, (node) => {
      if (ANNOTATION_TYPES.includes(node.name)) {
        visitAnnotation(node);
        return;
      }
      if (CALLOUT_TYPES.includes(node.name)) {
        visitCallout(node);
        return;
      }
    });
  };

  return transformer;
};
