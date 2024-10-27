import dynamic from "next/dynamic";
import React, { useState } from "react";

const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  onSelect: (selectedOption: Option | null) => void;
  selectedOption?: Option | null;
}
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    fontFamily: "var(--font-toyotaDisplay)",
    fontSize: "var(--amplify-font-sizes-xxl)",
    lineHeight: "var(--amplify-line-heights-large)",
    width: "auto",
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

export function Select({ options, onSelect, selectedOption }: SelectProps) {
  const [defaultSelected, setDefaultSelected] = useState<Option | null>(
    selectedOption || null
  );

  const onChangeHandler = (option: Option | null) => {
    setDefaultSelected(option);
    onSelect(option);
  };

  return (
    <ReactSelect
      options={options}
      value={defaultSelected}
      onChange={(option) => onChangeHandler(option as Option)}
      components={{ IndicatorSeparator: null }}
      backspaceRemovesValue={false}
      styles={customStyles}
      isSearchable={false}
    />
  );
}
