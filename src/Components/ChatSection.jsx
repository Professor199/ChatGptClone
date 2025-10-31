import React, { useContext, useRef, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { dataContext } from "./Context/UserContext";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const ChatSection = ({setRecentPrompt}) => {
  const [prompt, setPrompt] = useState("");
  const { sent } = useContext(dataContext);
  const { response } = useContext(dataContext);
  const { loading } = useContext(dataContext);
  const ref=useRef()
  
  const updateCurrent=()=>{
    ref.current=prompt
    setRecentPrompt(ref.current)
  }
  
  return (
    <div className="inputchat">
      {loading ? (
        <div>
          <Loader
            active
            inline="centered"
            size="large"
            content="Loading..."
            inverted
          />
        </div>
      ) : response?.length > 0 && response !== undefined ? (
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "18px",
            overflowY: "scroll",
          }}
        >
          <p>{response}</p>
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: "80px", color: "white", textAlign: "center" }}>
            Hello Aditya!
          </h1>
          <h2 style={{ fontSize: "60px", color: "white", textAlign: "center" }}>
            I'm Your Own Assistant
          </h2>
          <h3 style={{ fontSize: "20px", color: "white", textAlign: "center" }}>
            How can I help you?
          </h3>
        </div>
      )}
      <div className="inputsection">
        <input
          type="text"
          placeholder="Ask Anything"
          style={{
            width: "100%",
            borderRadius: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sent(prompt);
              setPrompt("")
              updateCurrent()
            }
          }}
        />
        <button
          style={{
            backgroundColor: "white",
            margin: "5px",
            borderRadius: "15px",
            height: "90%",
            cursor: "pointer",
            padding: "5px",
          }}
          onClick={() => {sent(prompt);setPrompt("");updateCurrent()}}
        >
          <Icon name="send" />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
