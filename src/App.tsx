import { useEffect, useRef, useState } from 'react';
import PlayerNav from './components/PlayerNav';
import { AlphaTabApi, Settings } from '@coderline/alphatab';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<AlphaTabApi>();

  useEffect(() => {
    const api = new AlphaTabApi(elementRef.current!, {
      core: {
        file: 'https://www.alphatab.net/files/canon.gp',
        fontDirectory: '/font/',
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: '/soundfont/sonivox.sf2',
      },
    } as Settings);

    setApi(api);

    return () => {
      console.log('destroy', elementRef, api);
      api.destroy();
    };
  }, []);

  function playPause() {
    api?.playPause();
  }

  return (
    <div className='min-h-screen'>
      <div className='h-32'>
        <div className='w-full' ref={elementRef}></div>
      </div>

      <PlayerNav playPause={playPause} />
    </div>
  );
}

export default App;
