module.exports = (obj, reqbody) => {
    for(let key in obj) {
        if(reqbody.hasOwnProperty(key))
            obj[key] = reqbody[key]
    }
    return obj
}