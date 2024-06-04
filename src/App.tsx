import { useEffect, useRef, useState } from 'react';
import PlayerNav from './components/PlayerNav';
import { AlphaTabApi, Settings } from '@coderline/alphatab';
import clsx from 'clsx';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<AlphaTabApi>();

  useEffect(() => {
    const alphaTabApi = new AlphaTabApi(elementRef.current!, {
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
    console.log(elementRef);
    setApi(alphaTabApi);

    return () => {
      console.log('destroy', elementRef, alphaTabApi);
      alphaTabApi.destroy();
    };
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='h-32'>
        <div className='w-full' ref={elementRef}>
          <div className={clsx('at-cursor-beat', 'bg-blue-500 w-[3px]')}></div>
        </div>
      </div>
      <PlayerNav api={api} />
    </div>
  );
}

export default App;
