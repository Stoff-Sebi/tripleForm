import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

// configuring enzyme -> specifies the adapter
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

//run test without anything just to make sure that everything works
it('Smoketest if test-setup is configured correctly and doesn\'t crash. Jest + Enzyme + Typescript', ()=>{
    //do nothing.
});