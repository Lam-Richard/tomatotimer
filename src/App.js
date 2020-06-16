import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import tomatoTimer from './tomatotimer.svg';


const Tomato = () => {
  return (
    <div 
      style = {{
        width: "33vw", height: "60vh", 
        backgroundImage: `url(${tomatoTimer})`, backgroundRepeat: "no-repeat", backgroundPosition: "center",
        position: "absolute", top: "20vh", left: "33vw", 
        display: "flex", 
        justifyContent: "center", alignItems: "center",}}
    >
      <div style = {{display: "flex", width: "55%", borderRadius: "5px", border: "2px solid beige", position: "relative",
            height: "18%", justifyContent: "center", top: "10vh"}}>
        <Timer></Timer>
      </div>
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
    <div 
      style = {{fontFamily: "Verdana", backgroundColor: "beige", fontSize: "300%", height: "100%",
      width: "100%", display: "flex",
      justifyContent: "center", alignItems: "center", userSelect: "none",}}
    >
        {moment(current).format('hh')} : {moment(current).format('mm')} : {moment(current).format('ss')}
    </div>
  )
}

const App = ()=> {
  
  return (
    <div style = {{display: "flex", flexFlow: "column nowrap", justifyContent: "center", marginTop: "-1vh"}}>
    <div style = {{height: "60vh", backgroundColor: "lightblue", 
    textAlign: "center", fontSize: "9vmin",
    fontFamily: "Permanent Marker"}}>
      <p>TOMATO TIMER</p>
    </div>
      <Tomato>
      </Tomato>
    <div style = {{height: "40vh", backgroundColor: "whitesmoke"}}></div>

    </div>
    
    
  );
}

export default App;
