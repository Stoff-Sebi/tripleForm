import React from "react";
import GamsWidget from "../common/GamsWidget";
import TripleForm from "./TripleForm";

const TripleFormWidget: React.FC = () => {
  return (
    <GamsWidget
      datastream="GAMS_WIDGET_TRIPLEFORM"
      globalPropName="GAMS_WIDGET_TRIPLEFORM"
    >
      <TripleForm/>
    </GamsWidget>
    )

}


export default TripleFormWidget;

