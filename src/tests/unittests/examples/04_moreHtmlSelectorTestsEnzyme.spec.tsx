import React from "react";
import Enzyme , { shallow } from "enzyme"; //import 
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/TripleForm";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

//NOT RECOMMENDED:
// - tests itself are valid
// - BUT: code impl does repeat itself -> e.g. multiple wrapping of <Demo>!

test('04a.MoreHtmlSelectorTests: Check if increment button from <Demo> is rendered', () => {
    const wrapper = shallow(<Demo/>);
    const button = wrapper.find("[data-test='increment-button']");
    expect(button.length).toBe(1);
});

test('04b.MoreHtmlSelectorTests: Check if counter display from <Demo> is rendered', () => {
    const wrapper = shallow(<Demo/>);
    const button = wrapper.find("[data-test='counter-display']");
    expect(button.length).toBe(1);
});