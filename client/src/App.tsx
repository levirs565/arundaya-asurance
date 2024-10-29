import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button';

function Counter({ initial }) {
  const [count, setCount] = useState(initial);
  return <div className="flex flex-row my-2">
    {count > -10 ?
      <Button onClick={() => setCount(count - 1)}>-</Button> :
      <Button>Gak Bisa</Button>
    }
    <p className="grow">
      {count == 0 && "Tengah"}
      <span> </span>
      Jumlah {count}
    </p>
    {count < 10 ?
      <Button onClick={() => setCount(count + 1)}>+</Button> :
      <Button>Gak Bisa</Button>
    }
  </div>
}

const initials = [0, 1];

function App() {
  return initials.map(int => <Counter key={int} initial={int} />)
}

export default App
