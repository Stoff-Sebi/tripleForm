import React from "react";

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

  React.useEffect(() => {
    if (localStorageKey === undefined) return;
    if (inputValue === undefined) return;

    //read out from local storage
    let storageValue = localStorage.getItem(localStorageKey);
    storageValue = storageValue !== null ? storageValue : inputValue;
    setInputValue(storageValue);
  }, []);

  React.useEffect(() => {
    onChange(inputValue);
    if (!localStorageKey) return;
    if (inputValue === undefined || inputValue === null)
      localStorage.setItem(localStorageKey, "");

    localStorage.setItem(localStorageKey, inputValue ? inputValue : "");
  }, [inputValue, localStorageKey]);

  return (
    <>
      <p>{localStorageKey}</p>
      <p>{useLocaleStorage}</p>
      <input
        onChange={evt => setInputValue(evt.currentTarget.value)}
        value={inputValue}
        {...properties}
      ></input>
    </>
  );
};

export default StorageInput;
