import * as React from 'react';

import { RoughNotation, RoughNotationProps } from 'react-rough-notation';

const Annotation: React.FC<RoughNotationProps> = ({ children, type, color }) => {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  return hydrated ? (
    <RoughNotation show type={type} color={color} animationDelay={500} strokeWidth={2} multiline>
      {children}
    </RoughNotation>
  ) : (
    children
  );
};

export const Highlight: React.FC<RoughNotationProps> = ({ children }) => (
  <Annotation type="highlight" color="yellow">
    {children}
  </Annotation>
);

export const Underline: React.FC<RoughNotationProps> = ({ children }) => (
  <Annotation type="underline" color="blue">
    {children}
  </Annotation>
);

export const Box: React.FC<RoughNotationProps> = ({ children }) => (
  <Annotation type="box" color="crimson">
    {children}
  </Annotation>
);

export const Circle: React.FC<RoughNotationProps> = ({ children }) => (
  <Annotation type="circle" color="crimson">
    {children}
  </Annotation>
);

export default Annotation;
