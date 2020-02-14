import React from "react";
import Enzyme, { shallow, ShallowWrapper, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/TripleForm";
import { act } from "react-test-renderer";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

describe("09_TestUseEffect", ()=>{

    const mockSetCounter = jest.fn();
    let wrapper: Enzyme.ReactWrapper<any>;

    //make sure that mock is cleared before each test.
    beforeEach(()=>{
        //resetting mocks.
        wrapper = mount(<Demo/>);   
        mockSetCounter.mockClear();  
    });

    it("SimpleBaseTest (Does not use globals form beforeEach): Counter is correctly being set to 1 (from initial 0) inside useEffect on mount.", () => {
        let component: Enzyme.ReactWrapper<any>;
        component = mount(<Demo></Demo>) ;
        if(!component)return fail();
        
        const counterDisplay = component.find("[data-test='counter-display']");
        expect(counterDisplay.text()).toContain(1);
    });

    it("UsingGlobalesTest (from BeforeEach): When component is mounted counter should be 1 and NOT 0 because setState call from inside useEffect.", () => {
        const counterDisplay = wrapper.find("[data-test='counter-display']");
        try {
            //should not contain 0!
            expect(counterDisplay.text()).toContain(0);
            fail();
        } catch(e) {
        }
    });

});