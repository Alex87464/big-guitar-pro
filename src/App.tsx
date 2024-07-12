import { useEffect, useRef, useState } from 'react';
import { AlphaTabApi, Settings } from '@coderline/alphatab';
import PlayerNav from './components/PlayerNav';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<AlphaTabApi>();

  useEffect(() => {
    const alphaTabApi = new AlphaTabApi(elementRef.current!, {
      core: {
        // file: 'https://www.alphatab.net/files/canon.gp', // This file is loaded from the internet
        file: '/gp-songs/temp/Chimera.gp5', // This is the file that will be loaded from the public folder
        fontDirectory: '/font/',
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: '/soundfont/sonivox.sf2',
        scrollOffsetY: -20,
      },
    } as Settings);
    console.log(elementRef);
    setApi(alphaTabApi);

    return () => {
      console.log('destroy', elementRef, alphaTabApi);
      alphaTabApi.destroy();
    };
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='w-full' ref={elementRef} />

      <PlayerNav api={api} />
    </div>
  );
}

export default App;
