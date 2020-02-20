import React from "react";

interface props {
  queryStart: string;
  query: string;
}

const QueryBuilder: React.FC<props> = ({ queryStart, query }) => {
  return (
    <>
      <br></br>{" "}
      <p>
        <em>Query Builder</em>
        <br></br> (set lifecycle to "deploy" to deactivate builder) <br></br>
        Query-Start: {queryStart}
      </p>{" "}
      <p>
        Decoded: <br></br> {query}
      </p>{" "}
      <p>
        Encoded:<br></br> {encodeURIComponent(query)}
      </p>{" "}
    </>
  );
};

export default QueryBuilder;
