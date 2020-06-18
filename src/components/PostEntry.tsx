import * as React from 'react';
import { Link } from 'gatsby';
import Time from '@/components/Time';

interface PostEntryProps {
  slug: string;
  date: string;
  title: string;
}

const PostEntry: React.FC<PostEntryProps> = ({ slug, date, title }) => (
  <li style={{ display: 'flex' }}>
    <span style={{ flexGrow: 0, flexShrink: 0 }}>
      <Time>{date}</Time>
    </span>
    <span>
      <Link to={slug}>{title}</Link>
    </span>
  </li>
);

export default PostEntry;
