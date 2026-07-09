import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PageTitle = ({ text=null, icon=null, children, className='' }) => (
  <header className={className + " m-0 py-3 px-3 text-base border-b-2 border-gray-700 flex items-center justify-between bg-city-green text-white"}>
    <div className="flex items-center">
      {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-white" />}
      {text && <h1 className="px-1 m-0 text-lg font-normal flex items-center">
        {text}
      </h1>}
    </div>
    {children && <div className="flex items-center justify-between w-full">
        {children}
      </div>}
  </header>
)

export default PageTitle;