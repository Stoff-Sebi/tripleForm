
interface QueryInputField {
  label: string,
  chosenValue: any,
  type: string,
  id: string;
  placeHolder: string;
  linkedRESTParameter: string;
}

interface Form {
    inputFields: QueryInputField[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface QueryTextInput extends QueryInputField {
    chosenValue: string,
    type: "text",
}

interface QuerySelectInput extends QueryInputField {
    chosenValue: string,
    type: "select",
}