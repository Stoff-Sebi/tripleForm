
interface InputField {
  label: string,
  chosenValue: any,
  type: string,
  id: string;
  placeHolder: string;
  linkedRESTParameter: string;
}

interface Form {
    inputFields: inputField[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface TextInput extends InputField {
    chosenValue: string,
    type: "text",
}

interface SelectInput extends InputField {
    chosenValue: string,
    type: "select",
}