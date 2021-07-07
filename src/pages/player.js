import ReactHlsPlayer from 'react-hls-player'
import { PageTitleText } from '../components/Layout'
import { REACT_APP_WEBCAM1 } from '../App';

export function Play() {
  return (
    <div>
    <PageTitleText>{'\n'}Living Room{'\n'}</PageTitleText>
  <ReactHlsPlayer
    src={REACT_APP_WEBCAM1}
    autoPlay={false}
    controls={true}
    width="100%"
    height="auto"/>
  <PageTitleText>{'\n'}</PageTitleText>
  </div>
  );
} 
