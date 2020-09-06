import React from "react";
import GamsWidget from "../common/GamsWidget";
import TripleForm from "./TripleForm";

const TripleFormWidget: React.FC = () => {
  return (
    <GamsWidget
      datastream="WIDGET_TRIPLE_FORM"
      globalPropName="__gamsWidget__TripleForm"
    >
      <TripleForm/>
    </GamsWidget>
    )

}


export default TripleFormWidget;

