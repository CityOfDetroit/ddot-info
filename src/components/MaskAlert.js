import { faHeadSideMask, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";

const MaskAlert = ({ showAlert, setShowAlert }) => {
  return (
    <div style={{ background: "#feb70d" }}>
      <div
        className="px-1 flex items-center justify-center alert "
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <FontAwesomeIcon icon={faHeadSideMask} className="mx-2" size="lg" />
        <p className="text-gray-900 text-base mx-3">Masks are <strong>required</strong> on board. <Link to={`/covid`}>More info here.</Link></p>
        <FontAwesomeIcon icon={faWindowClose} className="mx-2" size="lg" onClick={() => setShowAlert({...showAlert, mask: false})} />
      </div>
    </div>
  )
};

export default MaskAlert;