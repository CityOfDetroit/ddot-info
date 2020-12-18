import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
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
    >      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
        <div className="flex">
          <Link to={`/about`}>
            <FontAwesomeIcon icon={faInfoCircle} className='header-icon' />
            </Link>
          <Link to={`/`}>
          <FontAwesomeIcon icon={faHome} className='header-icon' />
            </Link>
        </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
