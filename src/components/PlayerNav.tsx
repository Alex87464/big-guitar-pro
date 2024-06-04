import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from './ui/label';
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  TimerOff,
  TimerReset,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useState } from 'react';
import { AlphaTabApi } from '@coderline/alphatab';

interface PlayerNavProps {
  api: AlphaTabApi | undefined;
}

export default function PlayerNav({ api }: PlayerNavProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isMetronome, setIsMetronome] = useState(false);
  const [isCountDownEnabled, setIsCountDownEnabled] = useState(false);
  const [tempo, setTempo] = useState(100);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    api?.playPause();
  };

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    api!.masterVolume = isMuted ? 1 : 0;
  };

  const handleRepeat = () => {
    setIsRepeat((prevRepeat) => !prevRepeat);
    api!.isLooping = !isRepeat;
  };

  const handleToggleMetronome = () => {
    setIsMetronome((prevMetronome) => !prevMetronome);
    api!.metronomeVolume = isMetronome ? 1 : 0;
  };

  const handleCountIn = () => {
    setIsCountDownEnabled((prevCountDown) => !prevCountDown);
    api!.countInVolume = isCountDownEnabled ? 1 : 0;
  };

  // const handleTempoChange = (value: number) => {
  //   // setTempo(value[0]);
  //   // Controls the current playback speed as percentual value. Normal speed is 1.0 (100%) and 0.5 would be 50%.
  //   // The value by default is 0.5.
  //   // To modify the speed of the playback, set this property to the desired value.
  //   api!.playbackSpeed = value / 100;
  // };
  const onTempoChange = (value: number) => {
    setTempo(value);
    api!.playbackSpeed = value / 100;
  };

  return (
    <div className='fixed bottom-0 z-10 w-full flex justify-center'>
      <div className='flex items-center justify-between bg-gray-900 text-white px-4 py-3 rounded-lg'>
        <div className='flex items-center space-x-4 pr-3'>
          <Button size='icon' variant='ghost'>
            <SkipBack className='w-6 h-6' />
          </Button>
          <Button size='icon' variant='ghost' onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause className='w-6 h-6' />
            ) : (
              <Play className='w-6 h-6' />
            )}
          </Button>
          <Button size='icon' variant='ghost'>
            <SkipForward className='w-6 h-6' />
          </Button>
          <Button size='icon' variant='ghost' onClick={handleRepeat}>
            {isRepeat ? (
              <Repeat1 className='w-6 h-6' />
            ) : (
              <Repeat className='w-6 h-6' />
            )}
          </Button>
          <Button size='icon' variant='ghost' onClick={handleToggleMute}>
            {isMuted ? (
              <VolumeX className='w-6 h-6' />
            ) : (
              <Volume2 className='w-6 h-6' />
            )}
          </Button>
          <Button
            size='lg'
            variant='ghost'
            className='flex flex-col items-center'
            onClick={handleToggleMetronome}
          >
            {isMetronome ? (
              <MdiMetronome className='w-6 h-6' />
            ) : (
              <MdiMetronomeOff className='w-6 h-6' />
            )}
            <Label className='text-sm text-muted-foreground'>Metronome</Label>
          </Button>
          <Button size='icon' variant='ghost' onClick={handleCountIn}>
            {isCountDownEnabled ? (
              <TimerOff className='w-6 h-6' />
            ) : (
              <TimerReset className='w-6 h-6' />
            )}
          </Button>
        </div>
        <div className='flex space-x-2'>
          <Slider
            disabled={isPlaying}
            defaultValue={[tempo]}
            onValueChange={(value) => {
              onTempoChange(value[0]);
            }}
            min={0}
            max={200}
            step={1}
            className='w-32 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform'
          />

          <Label>{tempo} bpm</Label>
        </div>
      </div>
    </div>
  );
}

function MdiMetronome(icon: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...icon}
    >
      <path
        fill='currentColor'
        d='m12 1.75l-3.43.92l-4.51 16.86c-.03.15-.06.31-.06.47c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2c0-.16-.03-.32-.06-.47l-1.36-5.11L17 16l.2 1h-3.79l2.84-2.84l-1.41-1.41L10.59 17H6.8l3.49-13h3.42l1.46 5.43l1.63-1.64l-1.37-5.12zM11.25 5v9.75l1.5-1.5V5zm8.54 2.8l-2.83 2.83l-.71-.71l-1.41 1.42l2.82 2.82l1.42-1.41l-.71-.71l2.83-2.83z'
      ></path>
    </svg>
  );
}

function MdiMetronomeOff(icon: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 256 256'
      {...icon}
    >
      <path
        fill='currentColor'
        d='M182.63 113.85L211 82.69a4 4 0 1 0-6-5.38L179.82 105l-19.3-60.68A12 12 0 0 0 149.08 36h-42.16a12 12 0 0 0-11.44 8.36l-50.9 160A12 12 0 0 0 56 220h144a12 12 0 0 0 11.43-15.64Zm7.56 50.15H137l39.37-43.31ZM103.1 46.79a4 4 0 0 1 3.82-2.79h42.16a4 4 0 0 1 3.82 2.79l20.71 65.09L126.23 164H65.81Zm100.12 163.57A4 4 0 0 1 200 212H56a4 4 0 0 1-3.81-5.21L63.27 172h129.46l11.07 34.79a4 4 0 0 1-.58 3.57'
      ></path>
    </svg>
  );
}
