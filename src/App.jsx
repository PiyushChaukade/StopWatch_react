import { useState, useRef, useEffect } from "react";

import "./App.css";
import { IoMdPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function App() {
  const [milisecond, setMilisecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isStopped, setisStopped] = useState(false);
  const stopintervalRef = useRef(null);

  useEffect(() => {
    if (isStopped) {
      stopintervalRef.current = setInterval(() => {
        setMilisecond((milisecond) => {
          if (milisecond >= 999) {
            console.log(milisecond,"milisecond");
            setSecond((previousSecond) => {

              if (previousSecond >= 59) {

                setMinute((minute) => minute + 1);
                
                return 0;
              } else {
                return second+1;
              }
            });
            return 0;
          } else {
            return milisecond + 10;
          }
        });
      }, 10);
    } 
    return ()=> clearInterval(stopintervalRef.current);
    
  }, [isStopped,second]);

  const resetClock = () => {
    if (!isStopped) {
      setMilisecond(0);
      setSecond(0);
      setMinute(0);
    }
  };
  const CombineButtons = () => {
    setisStopped(!isStopped);
  };
  return (
    <>
      <div id="container">
      {/* <div id="circle-border"></div> */}
        <div id="c1">
          <h2>StopWatch</h2>
          <div id="ptags">
            <p>{minute}</p>
           <p>:</p>
            <p>{second}</p>
            <p>:</p>
            <p>{milisecond}</p>
          </div>
        </div>

        <div id="c2">
          <button onClick={CombineButtons}>
            {isStopped ? (
              <>
                {" "}
                <FaPause />{" "}
              </>
            ) : (
              <>
                {" "}
                <IoMdPlay />{" "}
              </>
            )}
          </button>
          <button onClick={resetClock}>
            <GrPowerReset />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
