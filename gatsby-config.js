module.exports = {
  siteMetadata: {
    title: 'ツキの月',
    description: 'To be continued...',
    keywords: 'blog, gatsbyjs, system',
    siteUrl: 'https://qjx.app',
    lang: 'zh-Hans',
    author: {
      name: 'imtsuki',
      twitter: 'https://twitter.com/iimtsuki',
      github: 'https://github.com/imtsuki',
      email: 'me@qjx.app'
    },
    googleSiteVerificationCode: 'Sf3TQAKc2EfeBR3ltsbYlbX06bHJ4-QbsC_7Jko3zZ8',
    baiduSiteVerificationCode: 'lkLxPcUTqE'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: 'UA-128956609-1',
        head: false,
        anonymize: true
      }
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': 'src'
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: true,
              withWebp: true
            }
          },
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: 'ignore'
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'dimgray',
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://qjx.app'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ツキの月',
        short_name: 'ツキの月',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-meta-redirect'
  ]
};
