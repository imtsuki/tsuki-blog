import * as React from 'react';
import { graphql } from 'gatsby';

import Page from '@/components/Page';
import Container from '@/components/Container';
import IndexLayout from '@/layouts';

import 'katex/dist/katex.min.css';

interface PostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        lang: string;
      };
    };
  };
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <article lang={data.markdownRemark.frontmatter.lang}>
          <h1>{data.markdownRemark.frontmatter.title}</h1>
          <p>{data.markdownRemark.frontmatter.date}</p>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </article>
      </Container>
    </Page>
  </IndexLayout>
);

export default PostTemplate;

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        lang
      }
    }
  }
`;
