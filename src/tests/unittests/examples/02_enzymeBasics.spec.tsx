import React from "react";
import Enzyme , { shallow } from "enzyme"; //import 
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/TripleForm";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

test("02_UseBasicEnzyme: Example for how to use the shallow function", () => {
    // using the shallow function.
    // - shallow is actually rendering the componnent BUT not the children
    //   children are only rendered as shallow copies.     
    const wrapper = shallow(<Demo></Demo>);
    
    //.debug()
    // - debug returns the dom as a string.
    //   can be helpful for debugging.
    //   console.log(wrapper.debug());

    // expect()
    //  - jest has it's own assertions built in
    //  - throws an error when test fails.
    expect(wrapper).toBeTruthy();  //not be null, undefined, empty string
});