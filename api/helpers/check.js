//checks if body has specific keys
//returns true if all required fields are there || false
required_fields = (reqbody, ...keys) => 
  !!keys.reduce((prevkey, key) => prevkey * (key in reqbody), 1)

module.exports = {
    required_fields,
}