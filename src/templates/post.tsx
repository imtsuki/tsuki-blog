import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Page from '@/components/Page';
import Time from '@/components/Time';
import Container from '@/components/Container';
import IndexLayout from '@/layouts';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import 'katex/dist/katex.min.css';

interface PostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          twitter: string;
          github: string;
        };
      };
    };
    mdx: {
      body: string;
      excerpt: string;
      fields: {
        lang: string;
      };
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <article lang={data.mdx.fields.lang}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <Time date="">{data.mdx.frontmatter.date}</Time>
          <MDXProvider components={{ Link }}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
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
          twitter
          github
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      fields {
        lang
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
