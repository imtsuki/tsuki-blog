import * as React from 'react';

import { RoughNotation, RoughNotationProps } from 'react-rough-notation';

const Mark: React.FC<RoughNotationProps> = ({ children, type, color }) => (
  <>
    {typeof window !== 'undefined' ? (
      <RoughNotation show type={type} color={color} animationDelay={500} strokeWidth={2} multiline>
        {children}
      </RoughNotation>
    ) : (
      <></>
    )}
  </>
);
export const Highlight: React.FC<RoughNotationProps> = ({ children }) => (
  <Mark type="highlight" color="yellow">
    {children}
  </Mark>
);

export const Underline: React.FC<RoughNotationProps> = ({ children }) => (
  <Mark type="underline" color="blue">
    {children}
  </Mark>
);

export const Box: React.FC<RoughNotationProps> = ({ children }) => (
  <Mark type="box" color="crimson">
    {children}
  </Mark>
);

export const Circle: React.FC<RoughNotationProps> = ({ children }) => (
  <Mark type="circle" color="crimson">
    {children}
  </Mark>
);

export default Mark;
