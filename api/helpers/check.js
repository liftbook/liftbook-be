//checks if body has specific keys
//returns true if all required fields are there || false
required = (reqbody, ...keys) =>
  !!keys.reduce((prevkey, key) => prevkey * (key in reqbody), 1)

//loops through req.body and checks if any keys match the unique fields
//if there's a match, it checks to see if it's value already exists in the db
unique = async (reqbody, unique, model) => {
  for(let key in reqbody)
    if(unique.indexOf(key) !== -1)
      if(await model.get_by({[key]: reqbody[key]}))
        return key
  return true
}

// [
//   {key: value, value: value, model: model},
//   {key: value, value: value, model: model},
//   {key: value, value: value, model: model},
// ]
//loops through a list of objects, checking if each one exists
// existance = async (things) => {
//   things.forEach(thing => {
//     if(!await thing.model.get_by({[thing.key]: thing.value}))
//       return thing
//   })
//   return true
// }

module.exports = {
    required,
    unique,
}