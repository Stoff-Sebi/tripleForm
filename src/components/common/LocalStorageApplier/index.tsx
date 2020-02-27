import React from "react";

interface Props {
  value: string;
  storageKey: string;
  children: any;
  getLoadedValue: (val: string) => void;
  resetStoredValue?: boolean;
  
}

const LocalStorageApplier: React.FC<Props> = ({
  children,
  value,
  storageKey,
  getLoadedValue,
}) => {
  const [savedValue, setSavedValue] = React.useState<string>(value);

  React.useEffect(() => {    
    let storageVal = localStorage.getItem(storageKey);
    if(storageVal === null){
      storageVal=""
    } else {
      
    }
    setSavedValue(storageVal);
    if(getLoadedValue)getLoadedValue(storageVal);
  }, []);

  React.useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [value]);

  return (
    <>
      {children}
    </>
  );
};

export default LocalStorageApplier;
