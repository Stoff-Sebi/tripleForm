
import { GamsWidgetType } from "../components/common/GamsWidget";

export interface RestPathVariableGroup {
    restPathVariable: string;
    formGroups: QueryInput[];
}

export interface Input {
    label: string;
    small?: string;
    value?: string | SelectValue[];
    id?: string;
    placeHolder?: string;
    type?: "text" | "select" | "autocomplete";
    required?: boolean;
}

export interface TextInput extends Input {
    type: "text",
    value: string
}

export interface QueryInput extends Input, QueryBuildAble {}

export interface QueryTextInput extends TextInput, QueryInput {}

export interface SelectInput extends Input {
    type: "select";
    value: SelectValue[]
}

export interface SelectValue {
    label: string;
    value: string | number;
    _selected?: boolean;
}

export interface QuerySelectInput extends SelectInput, QueryInput {}


export interface AutcompleteInput extends Input {
    type: "autocomplete";
    value: SelectValue[];
}

export interface QueryAutocompleteInput extends AutcompleteInput, QueryInput {}

export interface QueryBuildAble {
    parameter?: string;
}

export interface TripleForm extends GamsWidgetType {
    gui: {
        queryStart: string;
        parameterDelimiter: string,
        params: RestPathVariableGroup[],
    }
}


export interface Form extends QueryBuildAble {
    inputFields: QueryInput[];
    setInputFields?: Function;
    handleSearch: (btnClickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    displayQuery?: boolean;
}


export interface JsonSchemaForm {
    $id: string,
    $schema: string,
    title: string,
    description: string,
    required: string[],
    type: "object",
    properties: Object
}