import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { default as ReactSelect } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  onSelect: (selectedOption: Option | null) => void;
  selectedOption?: Option | null;
}

export function Select({ options, onSelect, selectedOption }: SelectProps) {
  const [defaultSelected, setDefaultSelected] = useState<Option | null>(
    selectedOption || null
  );
  const [maxWidth, setMaxWidth] = useState<string>("auto");
  const selectRef = useRef<HTMLDivElement>(null);

  const onChangeHandler = (option: Option | null) => {
    setDefaultSelected(option);
    onSelect(option);
  };

  // Calculate the max width of the options
  useEffect(() => {
    if (selectRef.current) {
      // Create a temporary span to measure the width of each option
      const span = document.createElement("span");
      document.body.appendChild(span);
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.style.fontFamily = "var(--font-toyotaDisplay)";
      span.style.fontSize = "var(--amplify-font-sizes-xxl)";

      let maxWidth = 0;
      options.forEach((option) => {
        span.innerText = option.label;
        maxWidth = Math.max(maxWidth, span.offsetWidth);
      });

      document.body.removeChild(span);
      setMaxWidth(`${maxWidth + 50}px`); // +50 for padding and arrow
    }
  }, [options]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontFamily: "var(--font-toyotaDisplay)",
      fontSize: "var(--amplify-font-sizes-xxl)",
      lineHeight: "var(--amplify-line-heights-large)",
      width: maxWidth, // Set dynamic width
      display: "inline-flex",
      backgroundColor: "white",
      border: "none",
      padding: "16px 25px",
      borderRadius: "50px",
      cursor: "pointer",
    }),
    menu: (provided: any) => ({
      ...provided,
      fontFamily: "var(--font-toyotaDisplay)",
      fontSize: "var(--amplify-font-sizes-xxl)",
      lineHeight: "var(--amplify-line-heights-large)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontFamily: "var(--font-toyotaDisplay)",
      fontSize: "var(--amplify-font-sizes-xxl)",
      lineHeight: "var(--amplify-line-heights-large)",
      backgroundColor: state.isFocused ? "#D42224" : "#333333",
      color: "white",
      cursor: "pointer",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#000",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#000",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#000",
    }),
  };

  return (
    <div ref={selectRef}>
      <ReactSelect
        options={options}
        value={defaultSelected}
        onChange={(option) => onChangeHandler(option as Option)}
        components={{ IndicatorSeparator: null }}
        backspaceRemovesValue={false}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}
