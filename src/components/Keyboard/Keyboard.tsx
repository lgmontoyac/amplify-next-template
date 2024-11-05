import React, { FunctionComponent, useState, MutableRefObject } from "react";
import SimpleKeyboard, {
  SimpleKeyboard as SimpleKeyboardType,
} from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/spanish";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: MutableRefObject<typeof SimpleKeyboard | null>;
  inputName: string;
  inputPattern: any;
}

const Keyboard: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  inputName,
  inputPattern,
}) => {
  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  return (
    <div
      className={`keyboardContainer ${
        inputName !== "" && inputName ? "" : "hidden"
      }`}
    >
      <SimpleKeyboard
        keyboardRef={(r) => (keyboardRef.current = r)}
        layout={layout.layout}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
        inputName={inputName}
        inputPattern={inputPattern}
      />
    </div>
  );
};

export default Keyboard;
