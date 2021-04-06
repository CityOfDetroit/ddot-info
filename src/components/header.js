import { faInfoCircle, faList, faMapMarked, faHome, faChevronCircleDown, faChevronCircleRight, faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { useState } from "react"
import logo from '../images/ddot-logo-white.png'

const Header = ({ siteTitle, children }) => {

  let items = [
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
      title: `Nearby`,
      icon: faLocationArrow,
      link: `/nearby`
    },
    {
      title: `About this site`,
      icon: faInfoCircle,
      link: `/about`
    }
  ]

  let [open, setOpen] = useState(false)
  return (
    <>
      <header
        style={{
          background: `rgba(0,68,69,1)`,
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
            <img src={logo} className="h-6 mr-3" />
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
        {open && <div className="py-2 px-2 border-b-4 border-gray-700 grid grid-cols-2 gap-2" style={{ background: 'rgba(255, 255, 255, 0.9)', margin: `0 auto`, maxWidth: 960 }}>
          {items.map(i => (
            <Link key={i.title} to={i.link} className="flex items-center no-underline p-1 bg-opacity-50" aria-label={i.title} onClick={() => setOpen(false)}>
              <div className="w-8 text-right">
                <FontAwesomeIcon icon={i.icon} className='mr-2 text-gray-700' />
              </div>
              <span className="text-base ">{i.title}</span>
            </Link>
          ))}
        </div>}
      </header>
      {children}
    </>
  )
}

export default Header;
