---
title: Home
layout: home
nav_order: 1
---

# Welcome to this Repository

## Outline of the Project

Field of motor control is ever expanding

insight from empirical, modelling and replicating 

particularly recently with increase in model and simulation capacities, so that more complex systems can be investigated

number of gaps remain, generally reviewed in Loeb 2015 [^2]

emulating the hierarchichal organisation of nervous system might be more important than single model of entire system [^2]

outlining the assumptions made in modelling 

## How to Use

## How to Contribute

All repositories are structures as JSON objects

### References

References can be exported as CSL JSON 

need to add object key, year, month, and keywords

or alternatively do by hand, with required values:

```json

"nameYear":{
    "year": int,
    "month":int,
    "DOI": "",
    "title": "",
    "author":[
        {
            "family": "",
            "given":  ""
        }
    ],
    "keywords":[""]
}

```

### Map Information

add to the [anatomical_structures](https://github.com/ingaschoeyen/trial/docs/assets/json/anatomical_structures.json) file

structure as follows

```json

"structure":{
    "name": "",
    "description":"",
    "substructure":{
        "name": "",
        "description":"",
        "substructure":{
            ...
        }
    }
}

```

### Glossary


```json

"glossary_item":{
    "title": "",
    "definition":"",
    "related": [""]
}


---

[^2]: Loeb & Tsianos (2015) Major Remaining Gaps in Models of Sensorimotor Systems