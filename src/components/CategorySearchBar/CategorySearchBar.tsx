import React, { useEffect, useState } from "react";
import styles from "./CategorySearchBar.module.scss";
import { Button, Image, View } from "@aws-amplify/ui-react";
import Select from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface CategorySearchBarProps {
  categoryList: Option[];
  selectedCategory?: Option;
  onSearch: (selectedCategory: Option | null) => void;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    fontFamily: "var(--font-toyotaDisplay)",
    fontSize: "var(--amplify-font-sizes-xxl)",
    lineHeight: "var(--amplify-line-heights-large)",
    width: "auto",
    minWidth: "444px",
    display: "inline-flex",
    backgroundColor: "transparent",
    border: "none",
    padding: "16px 25px",
    paddingRight: "60px",
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

export function CategorySearchBar({
  categoryList,
  selectedCategory,
  onSearch,
}: CategorySearchBarProps) {
  const [defaultSelectedCategory, setDefaultSelectedCategory] =
    useState<Option | null>(selectedCategory || null);

  const onChangeHandler = (option: Option | null) => {
    setDefaultSelectedCategory(option);
    onSearch(option);
  };

  return (
    <View className={styles.wrapper}>
      <Select
        options={categoryList}
        value={defaultSelectedCategory}
        onChange={(option) => onChangeHandler(option as Option)}
        components={{ IndicatorSeparator: null }}
        backspaceRemovesValue={false}
        styles={customStyles}
      />
    </View>
  );
}
