## Problems

`data` directory contains problems 
Each folder contains:   
`data.json` contains properties to insert  
`content.html` contains problem statement  
It's possible to add multiple Swagger files  
for example:
```
"swaggerSpecs": [
    {"name": "main", "content": "swagger.json"}
  ]
```   
The content field will be replaced with the content from the `swagger.json` file.
Use markdown syntax:  
 Add code `<%- md("overview.md") %>` and create `overview.md` file  
  
Load all problems
```
node code-templates/load-problems.js
```