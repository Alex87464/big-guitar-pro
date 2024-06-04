import { useState } from 'react';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import PlayerNav from './components/PlayerNav';

function App() {
  const [count, setCount] = useState(0);

  const onIncrement = () => setCount(count + 1);
  const onDecrement = () => setCount(count - 1);
  const onReset = () => setCount(0);

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Label>Counter example</Label>

      <div className='flex flex-col items-center pt-5 gap-3'>
        <div className='flex items-center gap-3'>
          <Button onClick={onIncrement}>+1</Button>
          <Label>{count}</Label>
          <Button onClick={onDecrement}>-1</Button>
        </div>
        <Button variant='outline' onClick={onReset}>
          Reset
        </Button>
      </div>
      <PlayerNav />
    </div>
  );
}

export default App;
