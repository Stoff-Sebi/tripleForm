import React from "react";
import Enzyme , { shallow, ShallowWrapper } from "enzyme"; //import 
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/Demo";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
    adapter: new EnzymeAdapter()
});


/*******
 * 
 * Example on how you could refactor example 04.
 * via reusing functions.
 * 
 */


//SETUP FUNCTION
// - to avoid shallow copying the component in reach individual test
/**
 * Factory Function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup .
 * @param {any} state - Initial state for setup.
 * @returns {ShallowWrapper} 
 */
const setup = (props={}, state=null) => {
    return shallow(<Demo {...props}></Demo>)    //spread operator -> spreads object properties to component's props-
}

/**
 * Return ShallowWrapper containing node(s) with given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to serach withing 
 * @param {string} val - Value if data-test attribute for search.
 * @returns {ShallowWrapper} 
 */
const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
    return wrapper.find(`[data-test='${val}']`);
}


test('05a.MoreHtmlSelectorTests: Check if increment button from <Demo> is rendered', () => {
    const wrapper = setup(); //use setup function here
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
});

test('05b.MoreHtmlSelectorTests: Check if counter display from <Demo> is rendered', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
});