import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';

const SiteButton = ({ link, text, icon, ariaLabel }) => {
  return (
    <Link to={link} aria-label={ariaLabel} className="flex items-center my-4 text-center justify-around " >
      <button className="bg-gray-300 p-2 text-gray-800 flex items-center justify-around w-48 bg-blue-200">
        <span>
          {text}
        </span>
        <FontAwesomeIcon icon={icon} className="text-gray-800" size="lg" />
      </button>
    </Link>
  )
}

export default SiteButton