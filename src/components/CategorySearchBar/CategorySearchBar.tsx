import React, { useState } from "react";
import styles from "./CategorySearchBar.module.scss";
import { Button, Image, View } from "@aws-amplify/ui-react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });
interface Option {
  value: string;
  label: string;
}

interface CategorySearchBarProps {
  categoryList: Option[];
  modelList?: Option[];
  selectedCategory?: Option;
  selectedModel?: Option;
  onSearch: (
    selectedCategory: Option | null,
    selectedModel: Option | null
  ) => void;
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
  modelList,
  selectedCategory,
  selectedModel,
  onSearch,
}: CategorySearchBarProps) {
  const [defaultSelectedCategory, setDefaultSelectedCategory] =
    useState<Option | null>(selectedCategory || null);
  const [defaultSelectedModel, setDefaultSelectedModel] =
    useState<Option | null>(selectedModel || null);

  const onChangeHandler = (
    action: "category" | "model",
    option: Option | null
  ) => {
    if (action === "category") {
      setDefaultSelectedCategory(option);
    } else {
      setDefaultSelectedModel(option);
    }
    onSearch(
      action === "category" ? option : defaultSelectedCategory,
      action === "model" ? option : defaultSelectedModel
    );
  };

  return (
    <View className={styles.wrapper}>
      <Select
        options={categoryList}
        value={defaultSelectedCategory}
        onChange={(option) => onChangeHandler("category", option as Option)}
        components={{ IndicatorSeparator: null }}
        backspaceRemovesValue={false}
        styles={customStyles}
      />
      {modelList && modelList.length > 0 && (
        <Select
          options={modelList}
          value={defaultSelectedModel}
          onChange={(option) => onChangeHandler("model", option as Option)}
          components={{ IndicatorSeparator: null }}
          styles={customStyles}
        />
      )}
      <View className={styles.separator}></View>
      <Button
        borderRadius="0"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={22}
        aria-label="save"
        onClick={() => onSearch(defaultSelectedCategory, defaultSelectedModel)}
        style={{
          border: "none",
          background: "transparent !important",
          padding: "0 60px",
        }}
      >
        <Image alt="Next" src="/icons/search.svg" />
      </Button>
    </View>
  );
}
