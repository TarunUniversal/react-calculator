import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import KeyPad from "./keypad";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,110
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];


function Calculator() {
  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem("app-mode"))
  );
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
   JSON.parse(localStorage.getItem("app-history")) || []
  );
  const handleKeyPress = (keyCode,key) => {
    if(!keyCode) return;
    if(!usedKeyCodes.includes(keyCode)) return;

    if(numbers.includes(key)){
      if(key==="0"){
        if(expression.length===0) return
      }
      setExpression(expression + key)
      calculateResult(expression + key)
    }
    else if(operators.includes(key)){
      if(!expression) return
      const lastChar = expression.slice(-1)
      if(operators.includes(lastChar)) return
      if(lastChar===".") return
      
      setExpression(expression + key)
    }
    //enter
    else if(keyCode===13){
      if(!expression) return
      calculateResult(expression);
      let tempHistory = [...history]
      if(history.length>10) tempHistory=tempHistory.slice(0,1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
    //backspace
    else if(keyCode===8){
      if(!expression) return
      setExpression(expression.slice(0,-1))
      calculateResult(expression.slice(0,-1))
    }
    else if(key === "."){
      if(!expression) return
      const lastChar = expression.slice(-1);
      if(!numbers.includes(lastChar)) return

      setExpression(expression+key)
    }
  }

  const calculateResult = (exp) => {
    if(!exp){
      setResult("");
      return
    }
    const lastChar = exp.slice(-1);
    if(!numbers.includes(lastChar)) exp = exp.slice(0,-1)

    const result = eval(exp).toFixed(2) + "";
    setResult(result);
  }

  const historyRef = useRef();
  const expressionRef = useRef();
  useEffect(() => {
    historyRef.current.scrollIntoView()
    historyRef.current.scrollLeft=historyRef.current.scrollWidth;
  }, [history])

  useEffect(() => {
    expressionRef.current.scrollLeft=expressionRef.current.scrollWidth;
  }, [expression])

  useEffect(() => {
    localStorage.setItem("app-mode", JSON.stringify(active));
  }, [active]);

  useEffect(() => {
    localStorage.setItem("app-history", JSON.stringify(history));
  }, [history]);

  return (
    <>
      <div className="calculator shadow"
        tabIndex="0"
        onKeyDown={(event)=> handleKeyPress(event.keyCode,event.key)}
      >
        <div className="nav">
          <div className="toggle" onClick={() => setActive(!active)}>
            <img
              className={active ? "toggle_circle" : "toggle_circle_active"}
              src={
                active
                  ? "https://img.icons8.com/emoji/48/000000/sun-emoji.png"
                  : "https://img.icons8.com/color/50/000000/moon-satellite.png"
              }
              alt="#"
            />
          </div>
        </div>

        <div className={active ? "display" : "display_dark"} >
              <div className="history" >
              {history &&
          history?.map((item) => (
            <p key={item + "" + Math.random() * 44}>{item}</p>
          ))}
            <p ref={historyRef}></p>
              </div>

              <div ref={expressionRef} className="expresion" >
                <h6>{expression}</h6>
              </div>

              <div className="result" >
                <h6>{result}</h6>
              </div>
        </div>

        <div className={active ? "keypad_body" : "keypad_body_dark"} >
          <KeyPad handleKeyPress={handleKeyPress} />
              {/* <div className="extra_button">C</div>
              <div className="extra_button">%</div>
              <div className="extra_button" style={{borderRight:"none"}} >{`Del`}</div>
              <div className="button" >7</div>
              <div className="button" >8</div>
              <div className="button" >9</div>
              <div className="button_right_side" >/</div>
              <div className="button" >4</div>
              <div className="button" >5</div>
              <div className="button" >6</div>
              <div className="button_right_side" >x</div>
              <div className="button" >1</div>
              <div className="button" >2</div>
              <div className="button" >3</div>
              <div className="button_right_side" >-</div>
              <div className="button" style={{borderBottom:"none"}} >.</div>
              <div className="button" style={{borderBottom:"none"}} >0</div>
              <div className="button" style={{borderBottom:"none"}} >=</div>
              <div className="button_right_side" style={{borderBottom:"none"}} >+</div> */}
        </div>

      </div>
    </>
  );
}

export default Calculator;
