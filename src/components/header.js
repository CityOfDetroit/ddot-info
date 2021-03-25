import { faHome, faInfoCircle, faExclamationTriangle, faHeadSideMask, faMapMarked, faList } from "@fortawesome/free-solid-svg-icons"
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
      className="py-2 px-4 flex items-center justify-between header"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >      <h1 className="text-lg" style={{ margin: 0 }}>
        <Link
          to="/"
          aria-label="Home"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle.replace(".info", "")}
        </Link>
      </h1>
      <div className="flex text-lg">
        <Link to={`/system-map`} aria-label="System Map">
          <FontAwesomeIcon icon={faMapMarked} className='header-icon' />
        </Link>
        <Link to={`/`} aria-label="Routes">
          <FontAwesomeIcon icon={faList} className='header-icon' />
        </Link>
        <Link to={`/about`} aria-label="About">
          <FontAwesomeIcon icon={faInfoCircle} className='header-icon' />
        </Link>
      </div>
    </div>
  </header>
  <header style={{background: "#feb70d"}}
  >
    <div
      className="py-1 px-1 flex items-center justify-center alert "
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      <FontAwesomeIcon icon={faHeadSideMask} size="2x" className="mx-2 py-1" />
      <p className="text-gray-900">Masks are <strong>required</strong> on board. <Link to={`/covid`}>More info here.</Link></p>
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
