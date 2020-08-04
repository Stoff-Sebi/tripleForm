import React from "react";
import GamsWidget from "../common/GamsWidget";
import TripleForm from "./TripleForm";
import WidgetDefProvider from "../common/GamsWidget/WidgetDefProvider"
import DataProvider from "../common/GamsWidget/DataProvider"

const TripleFormWidget: React.FC = () => {
  return (
    <GamsWidget
      WidgetComponent={{ Component: TripleForm }}
      WidgetDefProvider={{ Component: WidgetDefProvider, props: { globalPropName:"__gamsWidget__TripleForm", datastream: "WIDGET_TRIPLE_FORM" } }}
      WidgetDataProvider={{ Component: DataProvider }}
    />
    )

}


export default TripleFormWidget;

