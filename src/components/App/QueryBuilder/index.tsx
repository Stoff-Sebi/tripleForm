import React from "react";
interface props {
  queryStart: string;
  query: string;
  paramDelimiter: string;
}

const QueryBuilder: React.FC<props> = ({
  queryStart,
  query,
  paramDelimiter
}) => {
  return (
    <div className={`container`}>
      <br></br>
      <h4>Query Build Helper</h4>
      <p>
        (set lifecycle to "deploy" to deactivate builder) <br></br>
        <br></br>Query-Start: <br></br>
        {queryStart}
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
