import { faHeadSideMask, faTicketAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";

const FareAlert = ({ showAlert, setShowAlert }) => {
  return (
    <div className="bg-green-200">
      <div
        className="px-1 flex items-center justify-center alert "
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <FontAwesomeIcon icon={faTicketAlt} className="mx-2" size="lg" />
        <p className="text-gray-900 text-base mx-3">DDOT is now <strong>collecting fares</strong>. <Link to={`/covid`}><b>Buy a pass.</b></Link></p>
        <FontAwesomeIcon icon={faWindowClose} className="mx-2" size="lg" onClick={() => setShowAlert({...showAlert, fare: false})} />
      </div>
    </div>
  )
};

export default FareAlert;