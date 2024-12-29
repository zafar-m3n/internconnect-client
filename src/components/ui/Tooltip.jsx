import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Tooltip = ({ content, children, placement = "top" }) => {
  return (
    <Tippy content={content} placement={placement} arrow={true}>
      <span className="inline-block">{children}</span>
    </Tippy>
  );
};

export default Tooltip;
