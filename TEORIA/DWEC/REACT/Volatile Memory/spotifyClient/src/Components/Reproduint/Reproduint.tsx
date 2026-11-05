import { useState } from 'react';
import type { ReproduintProps } from './Types/ReproduintProps';

const Reproduint = (props: ReproduintProps) => {
  const [volume, setVolume] = useState(50);

  function baixarVolum() {
    if (volume > 0) {
      setVolume(volume - 1);
    }
  }

  function pujarVolum() {
    if (volume < 100) {
      setVolume(volume + 1);
    }
  }

  return (
    <section>
      <h1>REPRODUCTOR</h1>
      <div>
        <span>Volum: {volume}</span>{' '}
        <button type="button" onClick={baixarVolum}>-</button>
        <button type="button" onClick={pujarVolum}>+</button>
      </div>
      <p>{props.playingTrackTitle ?? 'no song is playing'}</p>
      {props.playingTrackTitle !== null && (
        <button type="button" onClick={props.stop}>Stop</button>
      )}
    </section>
  );
};

export default Reproduint;
