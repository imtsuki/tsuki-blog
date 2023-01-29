import { RoughNotation, type RoughNotationProps } from 'react-rough-notation';

export const Annotation = ({ children, type, color }: RoughNotationProps) => {
  return (
    <RoughNotation
      show
      type={type}
      color={color}
      animationDelay={500}
      strokeWidth={2}
      multiline
    >
      {children}
    </RoughNotation>
  );
};

export const Highlight = ({ children }: RoughNotationProps) => (
  <Annotation type="highlight" color="rgba(255, 215, 0, 25%)">
    {children}
  </Annotation>
);

export const Underline = ({ children }: RoughNotationProps) => (
  <Annotation type="underline" color="dodgerblue">
    {children}
  </Annotation>
);

export const Box = ({ children }: RoughNotationProps) => (
  <Annotation type="box" color="green">
    {children}
  </Annotation>
);

export const Circle = ({ children }: RoughNotationProps) => (
  <Annotation type="circle" color="crimson">
    {children}
  </Annotation>
);
