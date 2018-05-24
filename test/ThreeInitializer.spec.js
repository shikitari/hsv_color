const THREE = require('three');
import ThreeInitializer from '@/Modules/ThreeInitializer'

//import Enzyme,  { mount, shallow, render, configure } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';

describe('recived midi message',  () => {
  let e = document.createElement('div');
  e.id = "test_div";
  document.body.appendChild(e);

    beforeEach(() => {
      console.log("OK");
      
      document.body.innerHTML = __html__['dist/index.html'];
      document.getElementById("");
    });

  it('control change', () => {
    // document.body.innerHTML = __html__['dist/index.html'];
    // let t = new ThreeInitializer();
    // expect("o").to.equal("o");
  })
})
