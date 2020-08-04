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
          }
        ]
      }
    ]
  }



}