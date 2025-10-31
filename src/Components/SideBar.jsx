import React, { useState } from "react";
import { Icon } from "semantic-ui-react";

const SideBar = ({ setWidthBar, recentPrompt }) => {
  const [extend, setExtend] = useState(true);
  //   const [widthBar, setWidthBar] = useState();
  console.log(recentPrompt,"++++++++recent")
  return (
    <div
      className="sidebar"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        // width: `${widthBar}`,
      }}
    >
      <div className="bars">
        <Icon
          name="bars"
          size="large"
          onClick={() => {
            setExtend((prev) => !prev);
            setWidthBar(extend ? "10%" : "5%");
          }}
        />
      </div>
      <div className="newChat">
        <Icon name="facebook messenger" size="large" />
        {extend ? <p>New message</p> : null}
      </div>
      <div className="recent">
        <Icon name="comment outline" size="large" />
        {extend ? (
          <p>{recentPrompt.length > 0 ? recentPrompt : "Hello! how are..."}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
