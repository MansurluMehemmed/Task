import React, { useEffect, useRef, useState } from "react";

const questions = [
  { question: "1. HTML fayllarının əsas uzantısı nədir?", answer: "html" },
  { question: "2. CSS-də rəng təyin etmək üçün istifadə olunan xüsusiyyət hansıdır?", answer: "color" },
  { question: "3. JavaScript-də dəyişən təyin etmək üçün istifadə olunan açar söz hansıdır?", answer: "let" },
  { question: "4. React komponentləri hansı fayl uzantısında yazılır?", answer: "jsx" },
  { question: "5. Tailwind-də 'font-bold' nə üçündür?", answer: "qalın mətn" },
];
const states = {
  IDLE: "idle",
  ASKING: "asking",
  CHECKING: "checking",
  FINISHED: "finished",
};
const App = () => {
  const inputRef = useRef(null)
  const [consoleText, setConsoleText] = useState(
    ''
  );
  const [inputValue, setInputValue] = useState("");
  const [state, setState] = useState(states.IDLE);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const sendToConsole = (text) => {
    setConsoleText((prev) => prev +'\n' + text);
  };
  const handleInput = () => {
    const value = inputValue.trim().toLowerCase();
    
    setInputValue("");
    if (state === states.IDLE) {
      if (value === "start") {
        setState(states.ASKING);
        sendToConsole(questions[currentQuestion].question + '\n');
      }
    }else if(state === states.ASKING){
      setState(states.CHECKING);
      if(value===questions[currentQuestion].answer.toLowerCase()){
        sendToConsole(" Doğrudur! \n");
        
      }else {
        sendToConsole(`Yanlışdır ! Dogru cavab "${questions[currentQuestion].answer}"  \n`)
      }
    
    const nextQuestion = currentQuestion + 1;
     if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setState(states.ASKING);
        sendToConsole(questions[nextQuestion].question+'\n');
      } else {
        setState(states.FINISHED);
        sendToConsole("Quiz bitdi. Təşəkkürlər! \n");
      }}
    else if (state === states.FINISHED) {
      sendToConsole("Quiz artıq bitib. Yenidən başlamaq üçün səhifəni yeniləyin.\n");
    }
  };


  useEffect(() => {
    inputRef.current?.focus(); 
  }, []);

  const handleBlur = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };


  return (
    <div className="flex flex-col  justify-self-center p-2 bg-black text-white w-[50%] h-[80vh] rounded ">
      <p>{'>>Başlamaq üçün "Start" yazın.'}</p>
     
        <p className="whitespace-pre-line mb-[10px] overflow-y-auto max-h-[80vh]">{`${consoleText}`}</p>
      

        <input
         ref={inputRef}
         className="border-none outline-none"
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => e.key === "Enter" && handleInput()}
        onBlur={handleBlur}
      />
    
      
    </div>
  );
};

export default App;
