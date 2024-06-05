import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from './ui/label';
import {
  CircleHelp,
  Headphones,
  PlayCircle,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  Speaker,
  TimerOff,
  TimerReset,
  Volume1,
  VolumeX,
} from 'lucide-react';
import { PiMetronome, PiMetronomeBold } from 'react-icons/pi';
import { GiDrumKit, GiGuitarHead } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { AlphaTabApi } from '@coderline/alphatab';
import { Toggle } from './ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import clsx from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface PlayerNavProps {
  api: AlphaTabApi | undefined;
}
export default function PlayerNav({ api }: PlayerNavProps) {
  const [tracks, setTracks] = useState([] as any[]);

  const [masterVolume, setMasterVolume] = useState<any>(0);

  const [actualTrack, setActualTrack] = useState<any>(api?.tracks[0]); // Track the actual rendered track

  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTrackMuted, setActualTrackMuted] = useState(false);

  const [isRepeat, setIsRepeat] = useState(false);

  const [isMetronome, setIsMetronome] = useState(false);
  const [isCountDownEnabled, setIsCountDownEnabled] = useState(false);

  const [tempo, setTempo] = useState(100);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    api?.playPause();
  };
  const handleRepeat = () => {
    setIsRepeat((prevRepeat) => !prevRepeat);
    api!.isLooping = !isRepeat;
  };

  const handleToggleMetronome = () => {
    setIsMetronome(!isMetronome);
    api!.metronomeVolume = !isMetronome ? 1 : 0;
  };

  const handleCountIn = () => {
    setIsCountDownEnabled(!isCountDownEnabled);
    api!.countInVolume = !isCountDownEnabled ? 1 : 0;
  };

  const onTempoChange = (value: number) => {
    setTempo(value);
    api!.playbackSpeed = value / 100;
  };

  useEffect(() => {
    setTracks(api?.score?.tracks || []);
    setActualTrack(api?.tracks[0]);
    setMasterVolume(api?.masterVolume);
  }, [tracks]);

  return (
    <div className='fixed bottom-0 z-20 w-full flex justify-center pb-3'>
      <div className='flex items-center justify-between bg-slate-950 text-white px-4 py-3 rounded-lg'>
        <div className='flex items-center space-x-4 pr-3'>
          <Button size='icon' variant='ghost'>
            <SkipBack className='w-6 h-6' />
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Toggle
                    defaultPressed={isPlaying}
                    onPressedChange={handlePlayPause}
                  >
                    <PlayCircle />
                  </Toggle>
                </div>
              </TooltipTrigger>
              <TooltipContent align='center'>
                <p>Reproducir</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button size='icon' variant='ghost'>
            <SkipForward className='w-6 h-6' />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle onPressedChange={handleRepeat}>
                  {isRepeat ? <Repeat1 /> : <Repeat />}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent align='end'>Repetir</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size='icon' variant='ghost'>
                        <Volume1 />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-40'
                      onOpenAutoFocus={(event) => {
                        event.preventDefault();
                      }}
                    >
                      <Slider
                        defaultValue={[masterVolume]}
                        onValueChange={(value) => {
                          setMasterVolume(value[0]);
                          api!.masterVolume = value[0];
                        }}
                        min={0}
                        max={1}
                        step={0.01}
                        className='w-full'
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </TooltipTrigger>
              <TooltipContent>Volumen</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Toggle
                    defaultPressed={isMetronome}
                    onPressedChange={handleToggleMetronome}
                    asChild
                  >
                    <Button
                      size='icon'
                      variant='ghost'
                      className='flex flex-col items-center'
                    >
                      {!isMetronome ? (
                        <PiMetronome size={24} />
                      ) : (
                        <PiMetronomeBold size={24} />
                      )}
                    </Button>
                  </Toggle>
                </div>
              </TooltipTrigger>

              <TooltipContent align='center'>
                <Label>Metronome</Label>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle onPressedChange={handleCountIn}>
                  {!isCountDownEnabled ? <TimerOff /> : <TimerReset />}
                </Toggle>
              </TooltipTrigger>

              <TooltipContent align='center'>
                <Label>Count In</Label>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant='outline'
            size='icon'
            className='text-black'
            // onClick={() => console.log(api?.score?.tracks[actualTrack].name)} // This prints the actual track inside score
            onClick={() => console.log(api?.tracks)} // This prints the actual rendered track
          >
            <CircleHelp />
          </Button>
          <Button
            variant='outline'
            className='text-black w-10'
            size='icon'
            // onClick={() => console.log(api?.score?.tracks[actualTrack].name)} // This prints the actual track inside score
            onClick={() => api?.changeTrackMute([actualTrack], true)} // This prints the actual rendered track
          >
            <VolumeX />
          </Button>
          <Button
            variant='outline'
            className='text-black'
            size='icon'
            // onClick={() => console.log(api?.score?.tracks[actualTrack].name)} // This prints the actual track inside score
            onClick={() => api?.changeTrackMute([actualTrack], false)} // This prints the actual rendered track
          >
            <Speaker />
          </Button>
        </div>

        <Slider
          disabled={isPlaying}
          defaultValue={[tempo]}
          onValueChange={(value) => {
            onTempoChange(value[0]);
          }}
          min={0}
          max={200}
          step={1}
          className={clsx(
            {
              'cursor-not-allowed': isPlaying,
              'cursor-pointer': !isPlaying,
            },
            'w-32 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform'
          )}
        />

        <div className='flex mx-2 w-20'>
          <Label>{tempo} bpm</Label>
        </div>
        <div className='px-3'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='default'>Instrumentos</Button>
            </PopoverTrigger>
            <PopoverContent className='w-fit' align='end'>
              <div className='flex flex-col space-y-2'>
                <h4 className='scroll-m-20 text-xl font-semibold tracking-tight border-b'>
                  Instrumentos
                </h4>
                {tracks?.map((track) => (
                  <div
                    key={track.index}
                    onClick={() => {
                      api!.renderTracks([track]);
                      setActualTrack(track);
                    }}
                    className={clsx(
                      {
                        'border-blue-500': actualTrack?.index === track.index,
                      },
                      'flex gap-5 items-center justify-between  p-2 rounded-lg hover:border-slate-800 border-[1px] cursor-pointer'
                    )}
                  >
                    {track.staves[0].isPercussion ? (
                      <GiDrumKit size={32} />
                    ) : (
                      <GiGuitarHead size={32} />
                    )}
                    <Label>{track.name}</Label>
                    <p className='text-sm text-muted-foreground'>
                      {track.staves[0].stringTuning.name || 'Drums'}
                    </p>
                    <Separator orientation='vertical' className='h-7' />

                    <Toggle
                      onPressedChange={() =>
                        api?.changeTrackMute(
                          [api.score!.tracks[track.index]],
                          !api.score!.tracks[track.index].playbackInfo.isMute
                        )
                      }
                    >
                      <Headphones />
                    </Toggle>
                    <Toggle value='mute'>
                      <VolumeX />
                    </Toggle>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
