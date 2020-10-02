import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './App.css';




const Stopwatch = () => {
  const [miliSec, setMiliSec] = useState(0)
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)
  const [watchOn, setWatchOn] = useState(false)
  const [hour, setHour] = useState(0)
  const [laps, setLaps] = useState([])
  const [modalOn, setModalOn] = useState(false)
  const [timeStamp, setTimeStamp] = useState([])
  useEffect(()=> {
    setTimeout(()=> {
      if (watchOn === true) {
        let prevMiliSec = miliSec + 1;
        setMiliSec((miliSec + 1)%100);
        if (prevMiliSec === 100) {
          let prevSec = sec + 1;
          setSec((sec + 1)%60);
            if (prevSec === 60) {
              let prevMin = min + 1;
              setMin((min+1)%60);
              if (prevMin === 60) {
                let prevHour = hour + 1;
                if (prevHour === 100) {
                  setHour(0)
                  setMin(0)
                  setSec(0)
                  setMiliSec(0)
                } else {
                setHour((hour + 1) % 99);
              }
            }
          }
        }
      }
      
    }, 7)
  }, [watchOn, miliSec])

  

  function toggleOn () {
    if (watchOn === false) {
      setWatchOn(true);
    } else {
      setWatchOn(false);
    }
  }

  function resetEverything () {
    setWatchOn(false)
    setMiliSec(0)
    setSec(0)
    setMin(0)
    setHour(0)
    setLaps([])
  }

  function addLap () {
    if (watchOn) {
      let newLaps = laps.concat(`${hour}:${min}:${sec}:${miliSec}`)
      setLaps(newLaps)
    } else {
      console.log(laps)
      setModalOn(true)
    }
    
  }
  
  

  
  function closeMod () {
    setModalOn(false)
  }

  useEffect(()=> {
    setTimeStamp(laps.map(lap =>
    <div style={{width: "20%", height: "20%", border: 
    "solid green 5px", marginBottom: "10px", margin: "auto", borderRadius: "6px",
     backgroundColor: "rgba(138, 206, 99, 0.7)", fontFamily: "permanent marker", fontSize: "40px"}}>#{laps.indexOf(lap)+1}: {lap}</div>
      ))
  }, [laps])
  
  
  return ( 
   

    <div className="OutestStopwatch" style={{display: "flex", alignItems: "flex-start"}}>
      <div style={{visibility: modalOn ? "visible" : "hidden", 
      position: "fixed",zIndex: "3000", top: "0", left: "0", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "Center"}}>
        <div style={{height: "80%", width: "90%", backgroundColor: "whitesmoke", 
        display: "flex", alignItems: "flex-end", justifyContent: "center", flexFlow: "column nowrap"}}>
          <div style={{height: "80%", width: "100%", overflowY: "scroll", 
          display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
            {timeStamp}
          </div>
          <div className="hackClose" style={{height: "20%", width: "100%", borderRadius: "5px", 
          backgroundColor: "red", color: "green", fontFamily: "permanent marker", fontSize: "90px", textAlign: "center"}} onClick={closeMod}>Close</div>
        </div>
      </div>
      <div onClick={addLap} className="lapButton" style={{marginTop: "-70px", marginRight: "0", width: "100%", 
                  border: "beige 5px solid", textAlign: "center", 
  height:"70px", borderRadius: "5px", color: "whitesmoke", fontSize: "150%", fontFamily: "permanent marker"}}>
      {watchOn ? "Lap" : "View Laps"}
    </div>


      <br></br>
      <br></br>
      <div className="StopwatchText" style={{fontSize: "45px"}}>
          <p>{hour < 10 ? "0" + hour : hour}:</p>
          <p>{min < 10 ? "0" + min : min}:</p>
          <p>{sec < 10 ? "0" + sec : sec}:</p>
          <p>{miliSec < 10 ? "0" + miliSec  : miliSec}</p>          
      </div>
      <br></br>
      <div className="StopwatchOnlyButtons" style={{margin: "auto"}}>      
        <Button onClick={toggleOn} variant="contained" color="secondary">
          {watchOn ? "STOP" : "START"}
        </Button>
        <br></br>
        <Button disabled={watchOn} onClick={resetEverything} variant="contained" color="secondary">
          RESET
        </Button>
        
      </div>
    </div>

  )
}

const Timer = () => {
  let initialTime = new Date();
  const [current, setCurrent] = useState(initialTime);
  useEffect(()=> {
    setTimeout(()=> {
      let newTime = moment(initialTime).add(1, 'second');
      setCurrent(newTime)
    }, 1000)
  }, [current])

  return (
    <div className="Timer">
        {moment(current).format('hh : mm : ss')}
    </div>
  )
}

const Tomato = ({display}) => { 
  return (
    <div className="OuterTomato">
      <div className="InnerTomato">
        {display === "timer" ? <Timer></Timer> : display === "watch" ? <Stopwatch></Stopwatch> : <Countdown></Countdown>}
      </div>
    </div> 
  )
}

const Countdown = ({display}) => {
  const audio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2017/11/Vivaldi-four-seasons-winter-movement-1.mp3?_=1");
  const [countDownOn, setCountDownOn] = useState(false);
  const [OneSec, setOneSec] = useState(0);
  const [TenSec, setTenSec] = useState(0);
  const [OneMin, setOneMin] = useState(0);
  const [TenMin, setTenMin] = useState(0);
  const [OneHrs, setOneHrs] = useState(0);
  const [TenHrs, setTenHrs] = useState(0);
  const [countDisabled, setCountDisabled] = useState("disabled");
  const [timesUp, setTimesUp] = useState(false);

  function resetTimesUp () {
    setOneSec(0)
    setTenSec(0)
    setOneMin(0)
    setTenMin(0)
    setOneHrs(0)
    setTenHrs(0)
    setCountDisabled("disabled")
    setTimesUp(false);
    setCountDownOn(false);
    audio.pause();
  }

  useEffect(()=> {
    if (timesUp == true && display != "watch" && display != "timer") {
      audio.play();
    } 
    return () => {
      audio.pause();
    }
  }, [timesUp, display])

  function toggleCountDown () {
    if (countDownOn == false) {
      setCountDownOn(true)
    } else {
      setCountDownOn(false)
    }
  }

  function checkReady () {
    let test = [OneSec, TenSec, OneMin, TenMin, OneHrs, TenHrs];
    let testStrings = [];
    let realNumbers = ["0","1","2","3","4","5","6","7","8","9"]
    let fakeNumbers = [0,1,2,3,4,5,6,7,8,9]
    let zeroCount = 0;
    test.map(element => {
      if (realNumbers.includes(element) || fakeNumbers.includes(element)) {
        if (element == 0) {
          zeroCount++;
        }

        testStrings.push(JSON.stringify(element));
      }
    })
    if (testStrings.length === 6 && zeroCount != 6)  {
        if (countDisabled == "disabled") {
          setCountDisabled("")
        }
      } else {
        if (countDisabled == "") {
          setCountDisabled("disabled")
        }
    }
  }
  
  function handleChange (e) { 
    let identifier = e.target.className;
    if (identifier == "TenHrs") {
      setTenHrs(e.target.value)
    } else if (identifier == "OneHrs") {
      setOneHrs(e.target.value)
    } else if (identifier == "TenMin") {
      if (e.target.value > 5) {
        setTenMin(5)
      } else {
        setTenMin(e.target.value)
      }
    } else if (identifier == "OneMin") {
      setOneMin(e.target.value)
    } else if (identifier == "TenSec") {
      if (e.target.value > 5) {
        setTenSec(5)
      } else {
        setTenSec(e.target.value)
      }
    } else if (identifier == "OneSec") {
      setOneSec(e.target.value)
    }
  }

  useEffect(()=> {
    checkReady()
  }, [OneSec, TenSec, OneMin, TenMin, OneHrs, TenHrs, countDisabled])

  function checkZeroes () {
    let test = [OneSec, TenSec, OneMin, TenMin, OneHrs, TenHrs];
    return (test.every(element=> element == 0) == true)
  }

  useEffect(()=>{
    if (countDownOn == true) {
      setTimeout(()=>{
        let prevSec = OneSec - 1
        let isItDone = checkZeroes()

        if (prevSec == -1 && isItDone) {
          console.log("it's Over")
          setTimesUp(true)
        } else {
          if (OneSec != 0) {
            setOneSec(OneSec - 1)
          }
          else {
            setOneSec(9)
            if (TenSec != 0) {
              setTenSec(TenSec - 1)
            } else {
              setTenSec(5)
              if (OneMin != 0) {
                setOneMin(OneMin -1)
              } else {
                setOneMin(9)
                if (TenMin != 0) {
                  setTenMin(TenMin - 1)
                } else {
                  setTenMin(5)
                  if (OneHrs != 0) {
                    setOneHrs(OneHrs - 1)
                  } else {
                    setOneHrs(9)
                    if (TenHrs != 0) {
                      setTenHrs(TenHrs - 1)
                    }
                  }
                }
              }
            }
          }
        }
      }, 1000)
    } 
  }, [countDownOn, OneSec, countDisabled])
  
  return (
    <React.Fragment>
      {countDownOn == false ? 
        <div style={{fontFamily: "Verdana", backgroundColor: "beige", fontSize: "300%", flexFlow: "column nowrap", height: "auto", padding: 0, margin: 0, width: "100%", display: "flex", justifyContent: "center", userSelect: "none", }}>
          <br></br>
          <div style ={{display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", height: "60%", margin: "0 auto", }}> 
            <div>
            <input className="TenHrs" onChange={handleChange} value={TenHrs} style={{height: "40px", width: "40px", fontFamily: "Verdana", fontSize: "100%", backgroundColor: "beige", textAlign: "center"}} type = "text" pattern="[0-2]" maxLength="1"></input>
            <input className="OneHrs" onChange={handleChange} value={OneHrs} style={{height: "40px", width: "40px", fontFamily: "Verdana", fontSize: "100%", backgroundColor: "beige", textAlign: "center"}} type = "text" pattern="[0-4]" maxLength="1"></input>
            </div>
            <p>:</p>
            <div>
            <input className="TenMin" onChange={handleChange} value={TenMin} style={{height: "40px", width: "40px", fontFamily: "Verdana", fontSize: "100%", backgroundColor: "beige", textAlign: "center"}}type = "text" pattern="[0-5]" maxLength="1"></input>
            <input className="OneMin" onChange={handleChange} value={OneMin} style={{height: "40px", width: "40px", fontFamily: "Verdana", fontSize: "100%", backgroundColor: "beige", textAlign: "center"}}type = "text" pattern="[0-9]" maxLength="1"></input>
            </div>
            <p>:</p>

            <div>
            <input className="TenSec" onChange={handleChange} value={TenSec} style={{height: "40px", width: "40px", fontFamily: "Verdana", fontSize: "100%", backgroundColor: "beige", textAlign: "center"}} type = "text" pattern="[0-5]" maxLength="1"></input>
            <input className="OneSec" onChange={handleChange} value={OneSec} style={{height: "40px", width: "40px", fontFamily: "Verdana", fontSize: "100%", backgroundColor: "beige", textAlign: "center"}} type = "text" pattern="[0-9]" maxLength="1"></input>
            </div>
            
          </div>  
          <div style={{display: "flex", flexFlow: "row", justifyContent: "space-between", alignItems: "flex-start", marginLeft: "15px", marginRight: "15px"}}>
            <Button style={{height: "30%"}} variant="contained" color="secondary">HRS</Button>
            <br></br>
            <Button style={{height: "30%"}} variant="contained" color="secondary">MIN</Button>
            <br></br>
            <Button style={{height: "30%"}} variant="contained" color="secondary">SEC</Button>
          </div>  
          <Button disabled={countDisabled} onClick={toggleCountDown} style ={{width: "30%", position: "relative", margin: "0 auto"}} variant="contained" color="secondary">
          {countDownOn == false ? "START" : "PAUSE"}
          </Button>       
        </div>     
      : 
        <div style={{fontFamily: "Verdana", backgroundColor: "beige", fontSize: "300%", flexFlow: "column nowrap", height: "auto", padding: 0, margin: 0, width: "100%", display: "flex", justifyContent: "center", userSelect: "none", }}>
          <br></br>
          <div style ={{paddingTop: "8%", paddingBottom: "8%", display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", height: "80%", margin: "0 auto", }}> 
          <p>{timesUp == false ? `${TenHrs}${OneHrs} : ${TenMin}${OneMin} : ${TenSec}${OneSec}` : "TIME'S UP!!!"}</p>
          </div> 
          {timesUp == false ?
           <Button disabled={countDisabled} onClick={toggleCountDown} style ={{width: "30%", position: "relative", margin: "0 auto"}} variant="contained" color="secondary">
           {countDownOn == false ? "START" : "PAUSE"}
           </Button> 
           :
            <Button onClick={resetTimesUp} style ={{width: "30%", position: "relative", margin: "0 auto"}} variant="contained" color="secondary">
            RESET
            </Button>     
          }     
        </div>
      }
    </React.Fragment>   
  )
}

const App = ()=> {
  
  const [display, setDisplay] = useState("timer");
  const [inWatch, setInWatch] = useState("");
  const [inTimer, setInTimer] = useState("disabled");
  const [inCountDown, setInCountDown] = useState("");

  function toWatch () {
    if (display != "watch") {
      setDisplay("watch");
      setInWatch("disabled");
      setInTimer("")
      setInCountDown("")
    }
  }

  function toTimer () {
    if (display != "timer") {
      setDisplay("timer");
      setInTimer("disabled");
      setInWatch("")
      setInCountDown("")
    }
  }

  function toCountDown () {
    if (display != "countdown") {
      setDisplay("countdown");
      setInCountDown("disabled");
      setInWatch("")
      setInTimer("")
    }
  }

  return (
    <div style ={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", marginTop: "-1vh"}}>
      <div style ={{height: "60vh", backgroundColor: "lightblue", textAlign: "center", fontSize: "9vmin", fontFamily: "Permanent Marker"}}>
        <p>TOMATO TIMER</p>
      </div>
      <Tomato display={display}>
      </Tomato>
      <div style ={{height: "40vh", backgroundColor: "whitesmoke", display: "flex", justifyContent: "center", flexFlow: "column nowrap"}}>
        <div style ={{height: "5vh"}}></div>
        <div style ={{display: "flex", flexFlow: "row nowrap",}}>
          <Button disabled={inWatch} onClick={toWatch} variant="contained" color="primary" style={{width: "10vw", position: "relative", margin: "0 auto" }}>Stop-Watch</Button>
          <Button disabled={inCountDown} onClick={toCountDown} variant="contained" color="primary" style={{width: "10vw", position: "relative", margin: "0 auto" }}>Timer</Button>
          <Button disabled={inTimer} onClick={toTimer} variant="contained" color="primary" style={{width: "10vw", position: "relative", margin: "0 auto" }}>Clock</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
