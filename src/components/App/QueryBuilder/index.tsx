import React from "react";
import StorageInput from "../../common/StorageInput";
interface props {
  queryStart: string;
  query: string;
  paramDelimiter: string;
}

const QueryBuilder: React.FC<props> = ({ queryStart, query, paramDelimiter }) => {

  const [state, setState] = React.useState<string>("");

  return (
    <div className={`container`}>
      <StorageInput
        localStorageKey="x"
        onChange={(val)=>setState(val)}
        useLocaleStorage={true}
        value={state}
      ></StorageInput>
      <br></br>
      <h4>Query Build Helper</h4>
      <p>
        (set lifecycle to "deploy" to deactivate builder) <br></br>
        <br></br>Query-Start: <br></br>{queryStart}
      </p>{" "}
      <hr></hr>
      <p>
        Decoded: <br></br> {query}
      </p>{" "}
      <hr></hr>
      <p>
        Encoded:<br></br> {encodeURIComponent(query)}
      </p>{" "}
      <hr></hr>
      <p>
        Given parameter-delimiter:<br></br> {paramDelimiter}
      </p>{" "}
    </div>
  );
};

export default QueryBuilder;
