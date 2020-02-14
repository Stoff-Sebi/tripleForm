import React from "react";
import Enzyme , { shallow } from "enzyme"; //import 
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/TripleForm";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

test("BasicEnzyme03 - HtmlElementSelectorTest:  Render the the <App/> component we wanted and not null.",()=>{
    //Create an enzyme shallow copy
    const wrapper = shallow(<Demo></Demo>);
    // use selector (data-test is a arbitrary html attribute specified in <App></App>)
    const appComponent = wrapper.find("[data-test='component-app']");
    expect(appComponent.length).toBe(1);
});

// you can do multiple tests in one file of course