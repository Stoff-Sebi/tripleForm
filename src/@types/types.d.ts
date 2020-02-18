
export interface Input {
    label: string;
    value?: string;
    id?: string;
    placeHolder?: string;
    type?: "text" | "select" | "autocomplete";
}

export interface QueryInput extends Input {
  subParameter?: string;
}

export interface QueryTextInput extends QueryInput {
    type: "text",
    value: string
}

export interface QuerySelectInput extends QueryInput {
    chosenValue: string;
    type: "select";
    value: SelectValue
}

export interface SelectValue {
    label: string;
    value: string;
    _selected: boolean;
}

export interface Form {
    inputFields: QueryInput[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    RESTParameter?: string;
    displayQuery?: boolean;
}