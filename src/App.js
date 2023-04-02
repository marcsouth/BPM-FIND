import React, { useState } from 'react';
import './App.css';
import { VscDebugRestart } from 'react-icons/vsc';
import { BsInfoLg } from 'react-icons/bs';

function App() {
  const [tapTimes, setTapTimes] = useState([]);
  const [bpm, setBpm] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [info, setInfo] = useState(false);


  const openModal = () => {
    setInfo(true);
  };

  const closeModal = () => {
    setInfo(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };
  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleTap = () => {
    const now = Date.now();
    const newTapTimes = [...tapTimes, now];
    setTapTimes(newTapTimes);

    if (newTapTimes.length > 1) {
      // Calculate weighted average of tap times
      let weightedSum = 0;
      let weightSum = 0;
      for (let i = 1; i < newTapTimes.length; i++) {
        const timeDiff = newTapTimes[i] - newTapTimes[i - 1];
        const weight = i;
        weightedSum += timeDiff * weight;
        weightSum += weight;
      }
      const newBpm = Math.round((60000 * weightSum) / weightedSum);
      setBpm(newBpm);
    }
  };

  const handleReset = () => {
    setTapTimes([]);
    setBpm(0);
  }

  return (
    <>
      <div className="wrapper">
        <div className="displaybpm">
          {bpm} <p>BPM</p>
        </div>

        <div className="splitcontainer">
          <div className="secondbpm">
            {bpm * 2}
            <p>DOUBLE TIME</p>
          </div>

          <div className="secondbpm">
            {bpm / 2}
            <p>HALF TIME</p>
          </div>
        </div>

        <button
          onClick={handleTap}
          className='mainbutton'
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
         TAP
        </button>

        <div className="splitcontainer">

          <button className='sidebutton' onClick={handleReset}>
              <VscDebugRestart fill="#3f3e3e" color="#3f3e3e" size={30}/>
          </button>

          <div className='sidebutton' onClick={openModal}>
             <BsInfoLg color="#3f3e3e" size={30}/>
          </div>


        </div>
      </div>

      <div className={`${info ? "modal" : "modalhidden"}`} onClick={closeModal}>

          <div className="modalcontainer">

             <h1>BPM FIND</h1>

             <ul>

              <li>To accurately determine the BPM, we suggest tapping at least 10 times to provide enough data for better precision on subsequent taps.</li>

              <li>We suggest setting the BPM range between 60-150 to allow for tapping to a preferred rhythm. The double time and half time features help to narrow down the optimal BPM.</li>

              <li>Clear your taps by using the reset button located on the left side of the screen.</li>

             </ul>

          </div>

      </div>
    </>
  )
};

export default App;
