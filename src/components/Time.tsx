import * as React from 'react';
import styled from '@emotion/styled';

interface TimeProps {
  date: string;
}

const StyledTime = styled.time`
  color: #808080;
  min-width: 200px;
  margin-right: 16px;
  font-size: 14px;
  font-variant-numeric: tabular-nums lining-nums;
`;

const Time: React.FC<TimeProps> = ({ children, date }) => <StyledTime>{children}</StyledTime>;

export default Time;
