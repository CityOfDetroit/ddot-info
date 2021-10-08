import { faChevronCircleDown, faChevronCircleRight, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {CSSTransition} from 'react-transition-group';
import AnimateHeight from 'react-animate-height';

const SiteSection = ({ children, className = "", titleClassName = "", subtitle = null, icon = null, title = null, fullWidth = false, expands = false, startsClosed = false, isOpen = false, scroll = false, dismissable = false, onDismiss = null }) => {

  let [visible, setVisible] = useState(true)
  let [open, setOpen] = useState(!startsClosed)

  if (visible) {
    return (
      <section className={className}>
        {(icon || title) && <div className={titleClassName + " flex justify-between items-center px-4 py-1 bg-city-green-muted"} onClick={expands ? () => setOpen(!open) : null}>
          {icon &&
            <div className="w-8">
              <FontAwesomeIcon icon={icon} className={(open || isOpen) ? "mr-2" : "mr-2 text-gray-600"} />
            </div>}
          {title &&
            <div className={(open || isOpen) ? "w-full m-0 font-thin" : "w-full m-0 font-thin text-gray-800"}>
              <h2 className={(open || isOpen) ? "font-thin m-0" : "font-thin text-gray-800 m-0"}>
                {title}
              </h2>
            </div>
          }
          {expands && <FontAwesomeIcon icon={(open || isOpen) ? faChevronCircleDown : faChevronCircleRight} size="lg" className={(open || isOpen) ? "text-black" : "text-gray-700"} onClick={() => setOpen(!open)} />}
          {dismissable && <FontAwesomeIcon icon={faWindowClose} className={"text-black"} onClick={() => { setVisible(false); onDismiss() }} />}
        </div>}
        <AnimateHeight duration={350} height={subtitle && (open || isOpen) ? 'auto' : 0 }>
          <div style={{ background: 'rgba(0, 68, 69, 0.25)' }} className="text-sm leading-none text-gray-700 w-full bg-gray-300 px-4 pt-0 pb-2"><span>{subtitle}</span></div>
        </AnimateHeight>

        {/* {(open || isOpen) && <div className={fullWidth ?
          (scroll ? "scroll" : "")
          : (scroll ? "px-4 mt-3 scroll" : "px-4 mt-3")}>

          {children}
          </div>} */}
        {/* <CSSTransition
          in={open || isOpen}
          timeout={250}
          unmountOnExit
          classNames="sectiondrop">
            <div className="overflow-hidden">
            {children}
            </div>
        </CSSTransition> */}
        <AnimateHeight duration={350} height={open || isOpen ? 'auto' : 0 }>
        <div className={fullWidth ?
          (scroll ? "scroll" : "")
          : (scroll ? "px-4 mt-3 scroll" : "px-4 mt-3")}>

          {children}
          </div>
        </AnimateHeight>
      </section>
    );
  }
  else {
    return null;
  }
};

export default SiteSection;