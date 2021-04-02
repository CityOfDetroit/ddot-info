import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faChevronDown, faChevronCircleRight, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";

const SiteSection = ({ children, className = "", titleClassName = "", icon = null, title = null, fullWidth = false, expands = false, startsClosed = false, isOpen = false, scroll = false, dismissable = false, onDismiss = null }) => {

  let [visible, setVisible] = useState(true)
  let [open, setOpen] = useState(!startsClosed)


  if (visible) {

    return (
      <section className={className}>
        {(icon || title) && <div className={titleClassName + " flex items-center justify-between bg-gray-300 px-4 py-1"} onClick={expands ? () => setOpen(!open) : null}>
          {icon &&
            <div className="w-8">
              <FontAwesomeIcon icon={icon} className={(open || isOpen) ? "mr-2" : "mr-2 text-gray-600"} />
            </div>}
          {title && <h2 className={(open || isOpen) ? "w-full m-0 font-thin" : "w-full m-0 font-thin text-gray-700"}>{title}</h2>}
          {expands && <FontAwesomeIcon icon={(open || isOpen) ? faChevronCircleDown : faChevronCircleRight} className={(open || isOpen) ? "text-black" : "text-gray-700"} onClick={() => setOpen(!open)} />}
          {dismissable && <FontAwesomeIcon icon={faWindowClose} className={"text-black"} onClick={() => { setVisible(false); onDismiss() }} />}
        </div>}
        {(open || isOpen) && <div className={fullWidth ?
          (scroll ? "scroll" : "")
          : (scroll ? "px-4 mt-3 scroll" : "px-4 mt-3")}>
          {children}
        </div>}
      </section>
    );
  }
  else {
    return null;
  }
};

export default SiteSection;