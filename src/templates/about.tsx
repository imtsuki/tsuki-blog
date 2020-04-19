import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Page from '@/components/Page';
import Container from '@/components/Container';
import IndexLayout from '@/layouts';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

interface AboutTemplateProps {
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
        lang: string;
      };
    };
  };
}

const AboutTemplate: React.FC<AboutTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <article lang={data.mdx.fields.lang}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <MDXProvider components={{ Link }}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </article>
      </Container>
    </Page>
  </IndexLayout>
);

export default AboutTemplate;

export const query = graphql`
  query AboutTemplateQuery($slug: String!) {
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
      }
    }
  }
`;
