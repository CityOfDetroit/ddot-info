import { faHome, faList, faMapMarked } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React from "react"

import PageTitle from "../components/PageTitle"
import Seo from "../components/seo"
import SiteSection from "../components/SiteSection"

const NotFoundPage = () => (
  <>
    <Seo title="404: Not found" />
    <PageTitle text={`Page not found`} />
    <SiteSection>
      <p>We couldn't find that page. It may have moved when bus schedules changed.</p>
      <p>Here's where you can pick the trail back up:</p>
      <ul className="list-none">
        <li>
          <FontAwesomeIcon icon={faList} className="mr-2" />
          <Link to="/routes">List of all routes</Link> — find your route's map, schedule, and stops
        </li>
        <li>
          <FontAwesomeIcon icon={faMapMarked} className="mr-2" />
          <Link to="/system-map">System map</Link> — see every route on one map
        </li>
        <li>
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          <Link to="/">Home</Link>
        </li>
      </ul>
    </SiteSection>
  </>
)

export default NotFoundPage
