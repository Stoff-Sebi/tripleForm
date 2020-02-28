import React from "react";

interface Props {
  value: string;
  storageKey: string;
  children: any;
  onChange: (val: string) => void;
}

//TODO jsdoc
const LocalStorageApplier: React.FC<Props> = ({
  children,
  value,
  storageKey,
  onChange
}) => {

  React.useEffect(() => {
    let storageVal = localStorage.getItem(storageKey);
    if (storageVal === null) storageVal = "";
    if (onChange) onChange(storageVal);
  }, []);

  React.useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [value]);

  return <>{children}</>;
};

export default LocalStorageApplier;
