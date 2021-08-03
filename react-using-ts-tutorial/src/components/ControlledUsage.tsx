import React, { useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";

export const ControlledUsage = () => {
  const [value, setValue] = useState("Initial value");

  const onChange = (value: string) => {
    setValue(value);
  };

  return <SimpleMdeReact value={value} onChange={onChange} />;
};
