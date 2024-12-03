import React from "react";
import { Spin } from "antd";
const Spinner = () => {
  const [spinning, setSpinning] = React.useState(true);
  return (
    <>
      <Spin spinning={spinning} fullscreen size="large" />
    </>
  );
};
export default Spinner;
