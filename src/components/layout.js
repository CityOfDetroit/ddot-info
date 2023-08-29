/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import '../css/app.css'
import FareAlert from "./FareAlert"
import Header from "./header"
import MaskAlert from "./MaskAlert"

const Layout = ({ gridClass=null, children }) => {

  const [showAlert, setShowAlert] = useState({
    mask: false,
    fare: false
  })
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      postgres {
        feed: allFeedInfosList(condition: {feedIndex: 29}) {
          feedStartDate
          feedEndDate
        }
      }
    }
  `)

  const maxWidthStyle = {
    margin: `0 auto 0 auto`,
    maxWidth: 960,
    gridArea: 'f'
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title}>
        {showAlert.mask && <MaskAlert {...{showAlert, setShowAlert}} />}
        {showAlert.fare && <FareAlert {...{showAlert, setShowAlert}} />}
      </Header>
      <div
        className="main-layout"
        style={maxWidthStyle}
      >
        <main className={gridClass}>
          {children}
        </main>
      </div>
      <footer className="py-4 px-2 bg-gray-100 w-100 text-sm text-center border-t-4" style={maxWidthStyle}>
        <span className="w-full text-center py-1 block">
          © {new Date().getFullYear()}, <a href="https://detroitmi.gov/departments/detroit-department-transportation">Detroit Department of Transportation.</a>
        </span>
        <span>
          Showing service for dates: {data.postgres.feed[0].feedStartDate} to {data.postgres.feed[0].feedEndDate}.
        </span>
        <span className="w-full text-center py-1 block ">
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
