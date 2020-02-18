
interface QueryInput {
  label: string,
  chosenValue: any,
  type: string,
  id: string;
  placeHolder: string;
  linkedRESTParameter: string;
}

interface Form {
    inputFields: QueryInput[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface QueryTextInput extends QueryInput {
    chosenValue: string,
    type: "text",
}

interface QuerySelectInput extends QueryInput {
    chosenValue: string,
    type: "select",
}