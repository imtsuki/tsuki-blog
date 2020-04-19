import * as React from 'react';
import { Link } from 'gatsby';
import Time from '@/components/Time';

interface PostEntryProps {
  slug: string;
  date: string;
  title: string;
}

const PostEntry: React.FC<PostEntryProps> = ({ slug, date, title }) => (
  <div>
    <Time>{date}</Time>
    <Link to={slug}>{title}</Link>
  </div>
);

export default PostEntry;
