import * as React from 'react';
import { Link } from 'gatsby';
import Time from '@/components/Time';

interface PostEntryProps {
  slug: string;
  date: string;
  title: string;
}

const PostEntry: React.FC<PostEntryProps> = ({ slug, date, title }) => (
  <li>
    <span style={{ float: 'left' }}>
      <Time>{date}</Time>
    </span>
    <span style={{ display: 'table-cell' }}>
      <Link to={slug}>{title}</Link>
    </span>
  </li>
);

export default PostEntry;
