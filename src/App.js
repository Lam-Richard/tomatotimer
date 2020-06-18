import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import tomatoTimer from './tomatotimer.svg';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));










const Stopwatch = () => {
  
  const [centiSec, setCentiSec] = useState(0)
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)
  const [watchOn, setWatchOn] = useState(false)
  

  useEffect(()=> {
    setTimeout(()=> {
      if (watchOn === true) {
        let prevCentiSec = centiSec + 1;
        setCentiSec((centiSec + 1)%100);
        if (prevCentiSec === 100) {
          let prevSec = sec + 1;
          setSec((sec + 1)%60);
            if (prevSec === 60) {
              let prevMin = min + 1;
              if (prevMin = 100) {
                setCentiSec(0)
                setSec(0)
                setMin(0)
              } else {
                setMin((min + 1))
              }
            }
        }
      }
      
    }, 10)
  }, [watchOn, centiSec])

  function toggleOn () {
    if (watchOn === false) {
      setWatchOn(true);
    } else {
      setWatchOn(false);
    }
  }
  
  return (
    
    <div style={{display: "flex", flexFlow: "column nowrap"}}>
      <div style={{fontFamily: "Verdana", backgroundColor: "beige", fontSize: "300%", flexFlow: "row nowrap", height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", userSelect: "none",}}>
          <p>{min < 10 ? "0" + min : min} :</p>
          <p>&nbsp;{sec < 10 ? "0" + sec : sec} :</p>
          <p>&nbsp;{centiSec < 10 ? "0" + centiSec : centiSec}</p>
          
      </div>
      <br></br>
      <Button onClick={toggleOn} style ={{width: "50%", position: "relative", margin: "0 auto"}} variant="contained" color="secondary">
        {watchOn ? "STOP" : "START"}
      </Button>
    </div>
  )
}

const Timer = () => {
  let initialTime = new Date();
  const [current, setCurrent] = useState(initialTime);

  useEffect(()=> {
    setTimeout(()=> {
      let copyTime = initialTime
      let newTime = moment(copyTime).add(1, 'second');
      setCurrent(newTime)
    }, 1000)
  }, [current])


  return (
    <div style ={{fontFamily: "Verdana", backgroundColor: "beige", fontSize: "300%", height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", userSelect: "none",}}>
        {moment(current).format('hh')} : {moment(current).format('mm')} : {moment(current).format('ss')}
    </div>
  )
}




const Tomato = ({display}) => {
  return (
    <div 
      style={{
        width: "33vw", height: "60vh", 
        backgroundImage: `url(${tomatoTimer})`, backgroundRepeat: "no-repeat", backgroundPosition: "center",
        position: "absolute", top: "20vh", left: "33vw", 
        display: "flex", 
        justifyContent: "center", alignItems: "center",}}
    >
      <div style ={{display: "flex", width: "55%", backgroundColor: "beige", borderRadius: "5px", border: "2px solid beige", position: "relative", height: "18%", justifyContent: "center", top: "10vh"}}>
        {display === "timer" ? <Timer></Timer> : <Stopwatch></Stopwatch>}
      </div>
    </div>
    
  )
}

const App = ()=> {
  
  const [display, setDisplay] = useState("timer");
  const [inWatch, setInWatch] = useState("");
  const [inTimer, setInTimer] = useState("disabled");


  function toWatch () {
    if (display != "watch") {
      setDisplay("watch");
      setInWatch("disabled");
      setInTimer("")
    }
  }

  function toTimer () {
    if (display != "timer") {
      setDisplay("timer");
      setInTimer("disabled");
      setInWatch("")
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
        <div style = {{display: "flex", flexFlow: "row nowrap",}}>
          <Button disabled={inWatch} onClick={toWatch} variant="contained" color="primary" style={{width: "10vw", position: "relative", margin: "0 auto" }}>Stop-Watch</Button>
          <Button disabled={inTimer} onClick={toTimer} variant="contained" color="primary" style={{width: "10vw", position: "relative", margin: "0 auto" }}>Timer</Button>
        </div>
        
      </div>
    </div>
    
    
  );
}

export default App;
