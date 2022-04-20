require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const targetAddress = new URL(
  process.env.TARGET_ADDRESS || `http://localhost:8000`
);

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "D Simcock and Son | Builders Doncaster",
    description:
      "D Simcock and Son Builders Doncaster | Builders in Doncaster since 1986 | Building & Industrial Contractors, Doncaster, South Yorkshire | Tel 01302 710302 Mobile 07836 527331 | Email dsimcock@aol.com",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.TARGET_BUCKET_NAME || "fake-bucket",
        region: process.env.AWS_REGION,
        protocol: targetAddress.protocol.slice(0, -1),
        hostname: targetAddress.hostname,
        acl: null,
        params: {
          // In case you want to add any custom content types: https://github.com/jariz/gatsby-plugin-s3/blob/master/recipes/custom-content-type.md
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: targetAddress.href.slice(0, -1),
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
