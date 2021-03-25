/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import '../css/app.css'

const Layout = ({ gridClass=null, children }) => {
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const maxWidthStyle = {
    margin: `.25em auto 0 auto`,
    maxWidth: 960,
    gridArea: 'f'
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        className="h-100 mb-4 main-layout"
        style={maxWidthStyle}
      >
        <main className={gridClass}>{children}</main>
      </div>
      <footer className="p-2 bg-gray-100 w-100 text-xs flex justify-between " style={maxWidthStyle}>
        <span>
          © {new Date().getFullYear()}, <a href="https://detroitmi.gov/departments/detroit-department-transportation">Detroit Department of Transportation.</a>
        </span>
        <span>
          <a href="https://airtable.com/shrugiMUTLnAn77Xd">Have a question or comment? Tell us here.</a>
        </span>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
