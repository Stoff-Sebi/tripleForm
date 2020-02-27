import React from "react";
import LocalStorageApplier from "../LocalStorageApplier";

interface props {
  onChange: (value: string) => void;
  value: string;
  localStorageKey: string;
  useLocaleStorage: boolean;
  [properties: string]:
    | React.InputHTMLAttributes<HTMLInputElement>
    | Function
    | string
    | boolean
    | null;
}

const StorageInput: React.FC<props> = ({
  onChange,
  value,
  localStorageKey,
  useLocaleStorage,
  ...properties
}) => {
  const [inputValue, setInputValue] = React.useState<string>(value);

  return (
    <>
      <LocalStorageApplier
        storageKey={localStorageKey}
        value={inputValue}
        getLoadedValue={(val)=>setInputValue(val)}
      >
        <input
          onChange={evt => setInputValue(evt.currentTarget.value)}
          value={inputValue}
          {...properties}
        ></input>
      </LocalStorageApplier>
    </>
  );
};

export default StorageInput;
