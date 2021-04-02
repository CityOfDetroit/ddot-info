import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PageTitle = ({ text=null, icon=null, children, className='' }) => (
  <header className={className + " m-0 py-2 px-4 text-lg border-b-2 border-gray-700 flex items-center justify-between"} style={{background: `rgba(4, 68, 69, 0.15)`}}>
    <div className="flex items-center">
      {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-black" />}
      {text && <span className="text-black px-1">
        {text}
      </span>}
    </div>
    {children && <div className="flex items-center justify-between w-full">
        {children}
      </div>}
  </header>
)

export default PageTitle;