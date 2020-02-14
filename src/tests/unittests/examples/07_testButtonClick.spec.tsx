import React from "react";
import Enzyme , { shallow, ShallowWrapper } from "enzyme"; //import 
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/TripleForm";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

test('07_testButtonClick: Simulated Button click increases the counter', ()=>{
    //Given: first wrap component under test
    const wrapper = shallow(<Demo/>);
    const button = wrapper.find("[data-test='increment-button']");
    
    //When: simulate behavior ()
    button.simulate('click');
    
    //Then: 
    const counterDisplay = wrapper.find("[data-test='counter-display']");
    expect(counterDisplay.text()).toContain("1");

});