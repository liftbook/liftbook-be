// IMPORTS

const uuid = require("uuid");

// local

const check_fields = require("../helpers/check_req_fields.js");
const modelRecords = require("../models/records");
const modelExercises = require("../models/exercises");
const modelUsers = require("../models/users");

// MIDDLEWARE

// getting record by rid

get = async (req, res, next) => {
  let record = await modelRecords.get_record_by({ rid: req.params.rid });
  if (!record) return next(`Sorry, can not find that record.`);

  req.body = record;
  next();
};

// adding a record

ass = async (req, res, next) => {
  const required_fields = ["rid", "uid", "eid"];

  // check if all the keys needed are there
  if (!check_fields(req.body, ...required_fields))
    return next(`These fields are required: ${required_fields}.`);

  // check if eid is unique
  if (await modelRecords.get_record_by({ eid: req.body.eid }))
    return next(
      `A record already exists for that exercise! Try updating the existing one`
    );

  // check if exercise exists and get eid
  const exercise = await modelExercises.get_exercise_by({
    name: req.body.name
  });
  console.log("exercise", exercise);
  if (exercise) req.body.eid = exercise.eid;
  else return next(`Exercise: ${req.body.name} doesn't exist.`);

  // check if user exists and get uid
  const user = await modelUsers.get_user_by({ uid: req.body.uid });
  console.log("user", user);
  if (user) req.body.uid = user.uid;
  else return next(`There is no user with that ID`);

  req.body = {
    rid: uuid.v4(),
    uid: req.body.uid,
    eid: req.body.eid,
    duration: req.body.duration,
    repetitions: req.body.repetitions,
    distance: req.body.distance,
    heart_rate: req.body.heart_rate,
    weight: req.body.weight,
    calories: req.body.calories,
    notes: req.body.notes,
    dateTime: req.body.dateTime
  };
  next();
};

// updating a record
update = async (req, res, next) => {
  // check if record exists
  let record = await modelRecords.get_record_by({ rid: record.params.rid });
  if (!record) return next(`Could not find record ${req.params.rid}`);

  // rebuild reqbody
  for (let key in record) {
    if (req.body.hasOwnProperty(key)) exercise[key] = req.body[key];
  }
  req.body = record;

  next();
};

// remove a record
remove = async (req, res, next) => {
  // check if record exists
  let record = await modelRecords.get_record_by({ rid: req.params.rid });
  if (!record) return next(`Could not find record ${req.params.rid}`);

  req.body = exercise;

  next();
};

//EXPORTS
module.exports = {
  add,
  get,
  update,
  remove
};
