import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

interface PostEntryProps {
  slug: string;
  date: string;
  title: string;
}

const StyledTime = styled.time`
  color: #808080;
  min-width: 200px;
  margin-right: 16px;
  font-size: 14px;
`;

const PostEntry: React.FC<PostEntryProps> = ({ slug, date, title }) => (
  <div>
    <StyledTime>{date}</StyledTime>
    <Link to={slug}>{title}</Link>
  </div>
);

export default PostEntry;
