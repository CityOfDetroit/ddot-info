import { faInfoCircle, faList, faMapMarked, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React from "react"

const Header = ({ siteTitle, children }) => {
  return (
    <>
      <header
        style={{
          background: `rgba(0,68,69,1)`,
        }}
      >
        <div
          className="p-3 flex items-center justify-between header"
          style={{
            margin: `0 auto`,
            maxWidth: 960,
          }}
        >      
          <h1 className="text-xl" style={{ margin: 0 }}>
            <Link
              to="/"
              aria-label="Home"
              className="text-white"
            >
              {siteTitle.replace(".info", "")}
            </Link>
          </h1>
          <div className="flex text-xl">
            <Link to={`/`} aria-label="Home">
              <FontAwesomeIcon icon={faHome} className='header-icon' />
            </Link>
            <Link to={`/system-map`} aria-label="System Map">
              <FontAwesomeIcon icon={faMapMarked} className='header-icon' />
            </Link>
            <Link to={`/routes`} aria-label="All bus routes">
              <FontAwesomeIcon icon={faList} className='header-icon' />
            </Link>
            <Link to={`/about`} aria-label="About">
              <FontAwesomeIcon icon={faInfoCircle} className='header-icon' />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}

export default Header;
