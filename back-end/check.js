queryParams = {
    name:'ray',
    age:"21",
    sex:'female'
}

for (const property in queryParams) {
   console.log(queryParams[property]);
  }