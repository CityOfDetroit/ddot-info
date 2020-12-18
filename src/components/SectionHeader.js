import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SectionHeader = ({ title, icon }) => {
    return (
        <div className="border-b-2 flex items-center py-1 px-1">
            <FontAwesomeIcon icon={icon} className='opacity-25 mr-3 text-xl' />
            <h2 className="m-0">{title}</h2>
        </div>
    )
}

export default SectionHeader