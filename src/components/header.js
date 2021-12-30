import { faInfoCircle, faList, faMapMarked, faHome, faChevronCircleDown, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { useState } from "react"
import logo from '../images/ddot-logo-white.png'
import AnimateHeight from 'react-animate-height';


const items = [
  {
    title: `Home`,
    icon: faHome,
    link: `/`
  },
  {
    title: `System map`,
    icon: faMapMarked,
    link: `/system-map`
  },
  {
    title: `List of routes`,
    icon: faList,
    link: `/routes`
  },
  {
    title: `About this site`,
    icon: faInfoCircle,
    link: `/about`
  }
]

const Dropdown = ({open, setOpen}) => {
  return (
    <div className="dropdown bg-city-green text-white p-2"           style={{
      margin: `0 auto`,
      maxWidth: 960,
    }}>
      {items.map(i => (
        <Link key={i.title} to={i.link} className="menu-item" aria-label={i.title} onClick={() => setOpen(false)}>
          <div className="w-8 text-right">
            <FontAwesomeIcon icon={i.icon} size={'lg'} />
          </div>
          <span className="ml-4">{i.title}</span>
        </Link>
      ))}
    </div>
  )
}

const Header = ({ siteTitle, children }) => {

  let [open, setOpen] = useState(false)
  return (
    <>
      <header
        style={{
          background: `rgba(0,68,69,1)`,
          overflow: 'hidden'
          // background: `rgba(255,255,255,1)`,
        }}
      >
        <div
          className="px-3 py-2 flex items-center justify-between header"
          style={{
            margin: `0 auto`,
            maxWidth: 960,
          }}
        >
          <h1 className="text-xl flex items-center" style={{ margin: 0 }}>
            <img src={logo} alt="DDOT logo" className="h-6 mr-3" />
            <Link
              to="/"
              aria-label="Home"
              className="text-white"
            >
              {siteTitle.replace(".info", "")}
            </Link>
          </h1>
          <div className="flex items-center justify-between text-xl">
            <div className="text-2xl">

            <FontAwesomeIcon icon={open ? faChevronCircleDown : faChevronCircleRight} onClick={() => setOpen(!open)} className='header-icon mr-2' />
            </div>
          </div>
        </div>
        {/* <CSSTransition
          in={open}
          unmountOnExit
          timeout={250}
          classNames="dropdown"
          > */}

          <AnimateHeight
            height={open ? 'auto' : 0}
            duration={250}>

              <Dropdown {...{open, setOpen}} />
            </AnimateHeight>
        {/* </CSSTransition> */}
      </header>
      {children}
    </>
  )
}

export default Header;
