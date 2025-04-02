import { useState, useCallback, useEffect } from 'react'
import './App.css'
import WavyBackground from './components/WavyBackground'


function App() {
  const [len, setLen] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (num) {
      str += '0123456789'
    }
    if (char) {
      str += '@#$%&*+'
    }

    for (let i = 1; i < len; i++) {
      let charIndex = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }, [len, num, char, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [len, num, char, passwordGenerator])

  return (
    <WavyBackground className="w-full p-2 justify-center">
    <div className='h-full p-5 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100'>
      <div id="title" className="">
        Password Generator
      </div>

     <div className="flex flex-col sm:flex-row gap-2 justify-center w-full">
      <input 
        type="text" 
        value={password} 
        className="w-full sm:w-[400px] md:w-[600px] py-2 px-4 mb-2 sm:mb-4 border rounded-md" 
        placeholder="Password" 
      />
      <button 
        onClick={() => {
          navigator.clipboard.writeText(password);
        }} 
        className="bg-blue-500 py-2 px-4 mb-4 border rounded-md text-white hover:bg-blue-600 w-full sm:w-auto">
        Copy
      </button>
      </div>
      
      <div>
      <input 
            type="range" 
            min={6} 
            max={20} 
            value={len} 
            className=" h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500" 
            onChange={(e) => {
              setLen(e.target.value)
            }}
          />

      <label className='m-2'>length: {len}</label>
      <label className='m-2'>Add Numbers:</label>
      <input type="checkbox" value={setNum} className="m-1" onChange={() => {
                setNum(prev => !prev)
              }}
            />
            <label htmlFor="numberInput" className="mr-4">add character</label>
            
            <input 
              type="checkbox" 
              id="charInput"
              checked={char}
              className="mr-2" 
              onChange={() => {
                setChar(prev => !prev)
              }}/>
      </div>
      <div><button
            onClick={passwordGenerator}
            className=" bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mt-2">
            Generate New Password
          </button>
        </div>
      </div>
    </WavyBackground>
  )
}

export default App
