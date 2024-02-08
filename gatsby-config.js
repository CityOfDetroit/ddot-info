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
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-293WGMRKP9", // Google Analytics / G4A
        ],
        gtagConfig: {
          // Anonymize IP addresses collected.
          anonymize_ip: true,
        },
        pluginConfig: {
          // Puts tracking script in the head instead of the body.
          head: true,
          // Respect browsers that request no tracking.
          respectDNT: true,
        },
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
    `gatsby-plugin-offline`
  ],
}
