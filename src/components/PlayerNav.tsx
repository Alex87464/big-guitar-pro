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
  Timer,
  TimerOff,
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
  const [isCountDown, setIsCountDown] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    api?.playPause();
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
          <Button size='icon' variant='ghost'>
            {isRepeat ? (
              <Repeat1 className='w-6 h-6' />
            ) : (
              <Repeat className='w-6 h-6' />
            )}
          </Button>
          <Button size='icon' variant='ghost'>
            {isMuted ? (
              <VolumeX className='w-6 h-6' />
            ) : (
              <Volume2 className='w-6 h-6' />
            )}
          </Button>
          <Button size='icon' variant='ghost'>
            {isCountDown ? (
              <Timer className='w-6 h-6' />
            ) : (
              <TimerOff className='w-6 h-6' />
            )}
          </Button>
        </div>
        <div className='flex space-x-2'>
          <Slider
            defaultValue={[100]}
            max={200}
            step={10}
            className='w-32 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform'
          />
          <Label>1x</Label>
        </div>
      </div>
    </div>
  );
}
