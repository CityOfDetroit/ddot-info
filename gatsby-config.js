let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`
});

module.exports = {
  siteMetadata: {
    title: `DDOT.info`,
    description: `Schedule information and more for Detroit's bus system`,
    author: `@rideddot`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`, 
      options: {
        trackingId: "UA-107915075-4",
        // this option places the tracking script into the head of the DOM
        head: true,
        // other options
        respectDNT: true
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ddot.info`,
        short_name: `ddot.info`,
        start_url: `/`,
        background_color: `#eee`,
        theme_color: `#004851`,
        display: `standalone`,
        icon: `./src/images/ddot-logo.png`
      },
    },
    {
      resolve: `gatsby-source-pg`,
      options: {
        connectionString: process.env.PG_CONN,
        schema: `gtfs`,
        appendPlugins: [require("@graphile/postgis").default]
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/components/layout')
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
