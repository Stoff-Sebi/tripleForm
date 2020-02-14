import React from "react";
import Enzyme , { shallow, ShallowWrapper } from "enzyme"; //import 
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/Demo";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

// Example for how to simple test state.
// - CANNOT TEST STATE IN FUNTIONAL COMPONENTS.
// - ONLY in class based components!


test('06.Testcomponent State: CANNOT TEST STATE DIRECTLY INSIDE REACT HOOKS - ', () => {
    const wrapper = shallow(<Demo/>);
    let initialCounterState;
    try {
        initialCounterState = wrapper.state('counter');
        //following code shouldn't be reached - because state can only be accessed in class based components.
        expect(initialCounterState).toBe(0);
        fail();
    } catch(e){
        //success if caught.
    }
});