import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme"; //import
import EnzymeAdapter from "enzyme-adapter-react-16";
import Demo from "../../../components/App/Demo";

//Base Enzyme config (usually done in extra file)
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

// Example for mocking useState() 
// - so that we can test it!
// - tests against state = test against implementation should be carefully considered.
// - jest.fn() -> used to mock functions.

describe("08_testUseState: ", () => {
  it("mocks the return of useState (the state and setState) and then checks if counter does increase.", () => {
    //jest.fn() --> mocks a function!
    const mockSetCounter = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCounter]);   //careful! need to also call it via React.useState() then in component under test!

    const wrapper = shallow(<Demo />);
    const button = wrapper.find("[data-test='increment-button']");

    // can apply mockevent to an simulated event.
    const mockEvent = { target: { value: "train" } };
    button.simulate("click", mockEvent);
    button.simulate("click", mockEvent);  //-> could use later on that event to check if setState is called e.g. with this event.

    //expect called once.
    expect(mockSetCounter).toBeCalled();
    //everytime called with one.
    expect(mockSetCounter).toHaveBeenCalledWith("1");
    //called two times.
    expect(mockSetCounter).toBeCalledTimes(2);
  });
});
