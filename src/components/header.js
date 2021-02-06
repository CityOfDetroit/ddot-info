import { faHome, faInfoCircle, faExclamationTriangle, faHeadSideMask } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <>
  <header
    style={{
      background: `rgba(0,68,69,1)`,
    }}
  >
    <div
      className="py-2 px-2 text-xl flex items-center justify-between"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >      <h1 className="text-2xl" style={{ margin: 0 }}>
        <Link
          to="/"
          aria-label="Home"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div className="flex text-2xl">
        <Link to={`/about`} aria-label="About">
          <FontAwesomeIcon icon={faInfoCircle} className='header-icon' />
        </Link>
        <Link to={`/`} aria-label="Home">
          <FontAwesomeIcon icon={faHome} className='header-icon' />
        </Link>
      </div>
    </div>
  </header>
  <header style={{background: "#feb70d"}}
  >
    <div
      className="py-1 px-2 flex items-center justify-center"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      <FontAwesomeIcon icon={faHeadSideMask} size="2x" className="mx-3 py-1" />
      <p>Masks are currently <strong>required</strong> on board. <Link to={`/covid`}>Click here for more information.</Link></p>
    </div>
  </header>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
