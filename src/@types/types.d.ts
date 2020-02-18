
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
    value: string
}

interface QuerySelectInput extends QueryInput {
    chosenValue: string;
    type: "select";
    value: SelectValue
}

interface SelectValue {
    label: string;
    value: string;
    _selected: boolean;
}

interface Form {
    inputFields: QueryInput[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    RESTParameter?: string;
    displayQuery?: boolean;
}