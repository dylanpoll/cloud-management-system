import axios from 'axios';
import { PageTitleText } from '../components/Layout';
import {HOST_SYSTEM,EXPRESS_PORT} from '../App';

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
export function WakeOnLan() {
  function dylanDesktop(e) {
    e.preventDefault();    axios.get(HOST_SYSTEM+EXPRESS_PORT+'/WOL/dylanDesktop').then((response) => { console.log(response.data) })
  }
  function dylanLaptop(e) {
    e.preventDefault();    axios.get(HOST_SYSTEM+EXPRESS_PORT+'/WOL/dylanLaptop').then((response) => { console.log(response.data) })
  }
  return (
    <PageTitleText>{'\n'} Wake On Lan{'\n'}
    <form onSubmit={dylanDesktop}>
      <button type="submit"> Dylans Desktop </button>
    </form>
    <form onSubmit={dylanLaptop}>
      <button type="submit"> Dylans Laptop </button>
    </form>
    </PageTitleText>
  );
}
