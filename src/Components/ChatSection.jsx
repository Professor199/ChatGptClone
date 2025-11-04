import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { dataContext } from "./Context/UserContext";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

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

  const containerRef = useRef(null);

useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
}, [response, loading]);

  
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
    ref={containerRef}
    style={{
      width: "95dvw",
      maxHeight: "65vh",
      overflowY: "auto",
      margin: "0 auto",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginLeft:"100px"
    }}
  >
    {/* User bubble */}
    {ref.current ? (
      <div
        style={{
          alignSelf: "flex-end",
          marginRight:"100px",
          maxWidth: "80%",
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          borderRadius: "16px 16px 4px 16px",
          padding: "10px 12px",
          lineHeight: 1.5,
          fontSize: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          wordBreak: "break-word",
        }}
      >
        {ref.current}
      </div>
    ) : null}

    {/* Assistant bubble (Markdown) */}
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "80%",
        background: "rgba(255,255,255,0.05)",
        color: "#fff",
        borderRadius: "16px 16px 16px 4px",
        padding: "12px 14px",
        lineHeight: 1.6,
        fontSize: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        border: "1px solid rgba(255,255,255,0.08)",
        wordBreak: "break-word",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({node, ...props}) => <h1 style={{fontSize:"22px", margin:"8px 0"}} {...props} />,
          h2: ({node, ...props}) => <h2 style={{fontSize:"20px", margin:"8px 0"}} {...props} />,
          h3: ({node, ...props}) => <h3 style={{fontSize:"18px", margin:"8px 0"}} {...props} />,
          p:  ({node, ...props}) => <p  style={{margin:"8px 0"}} {...props} />,
          ul: ({node, ...props}) => <ul style={{paddingLeft:"20px", margin:"8px 0"}} {...props} />,
          ol: ({node, ...props}) => <ol style={{paddingLeft:"20px", margin:"8px 0"}} {...props} />,
          code: ({inline, className, children, ...props}) =>
            inline ? (
              <code
                style={{
                  background:"rgba(255,255,255,0.12)",
                  padding:"2px 6px",
                  borderRadius:"6px",
                  fontFamily:"monospace"
                }}
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre
                style={{
                  background:"rgba(0,0,0,0.35)",
                  padding:"12px",
                  borderRadius:"10px",
                  overflowX:"auto",
                  margin:"8px 0"
                }}
              >
                <code className={className} {...props}>{children}</code>
              </pre>
            ),
          a: ({node, ...props}) => (
            <a style={{color:"#8ab4f8"}} target="_blank" rel="noreferrer" {...props} />
          ),
          table: ({node, ...props}) => (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%", borderCollapse:"collapse", margin:"8px 0"}} {...props} />
            </div>
          ),
          th: ({node, ...props}) => (
            <th style={{border:"1px solid #555", padding:"8px", background:"rgba(255,255,255,0.08)"}} {...props} />
          ),
          td: ({node, ...props}) => (
            <td style={{border:"1px solid #555", padding:"8px"}} {...props} />
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </div>
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
            width: "95dvw",
            borderRadius: "20px",
            textAlign: "center",
            fontWeight: "normal",
            fontSize:"18px",
            fontFamily:"monospace",
            marginBottom:0,
            marginTop:prompt.length>0 || response?.length>0?"52px":0,
            minHeight:"50px"
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
              marginTop:prompt.length>0 || response?.length>0?"52px":0,
            minHeight:"50px"
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
