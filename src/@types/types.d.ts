
interface Input {
    label: string;
    value?: string;
    id?: string;
    placeHolder?: string;
    type?: "text" | "select" | "autocomplete";
}

interface QueryInput extends Input {
  subParameter?: string;
}

interface QueryTextInput extends QueryInput {
    type: "text",
}

interface QuerySelectInput extends QueryInput {
    chosenValue: string,
    type: "select",
}

interface Form {
    inputFields: QueryInput[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    RESTParameter?: string;
    displayQuery?: boolean;
}