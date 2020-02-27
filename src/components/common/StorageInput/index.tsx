import React from "react";
import LocalStorageApplier from "../LocalStorageApplier";

interface props {
  onChange: (value: string) => void;
  value: string;
  localStorageKey: string | false;
  [properties: string]: any;
}

const StorageInput: React.FC<props> = ({
  onChange,
  value,
  localStorageKey,
  ...properties
}) => {
  return (
    <>
      {localStorageKey !== false ? (
        <LocalStorageApplier
          storageKey={localStorageKey}
          value={value}
          onChange={val => onChange(val)}
        >
          <input
            onChange={evt => onChange(evt.currentTarget.value)}
            value={value}
            {...properties} //spreads any further given properties
          ></input>
        </LocalStorageApplier>
      ) : (
        <input
          onChange={evt => onChange(evt.currentTarget.value)}
          value={value}
          {...properties} //spreads any further given properties
        ></input>
      )}
    </>
  );
};

export default StorageInput;
