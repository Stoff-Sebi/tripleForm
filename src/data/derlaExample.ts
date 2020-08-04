import { TripleForm } from "../@types/types";

const derlaExample: TripleForm = {

  lifecycle:"develop",
  name:"TripleForm for DERLA person search",
  description:"Using the TripleFormWidget to search for persons and their history in context of DERLA",
  gui: {
    parameterDelimiter:";",
    queryStart:"https://glossa.uni-graz.at/archive/objects/query:derla.allpersons?",
    params:[
      {
        restPathVariable:"params",
        formGroups:[
          {
            parameter:"$1",
            placeHolder:"Personensuche",
            label:"Eine Person suchen",
            small:"* zeigt alle Optionen an",
            type:"autocomplete",
            required:true,
            value:[
              {label:"Test01", value:"4"}
            ]
          },
          {
            parameter:"$2",
            placeHolder:"Obergruppe",
            label:"Obergruppe einschränken",
            small:"* zeigt alle Optionen an",
            type:"select",
            required:true,
            value:[
              {label:"Test01", value:"4"},
              {label:"Test02", value:"4123"}
            ]
          }
        ]
      },
    ]
  }



}