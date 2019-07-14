// IMPORTS

const uuid = require("uuid");

// local

const check_fields = require("../helpers/check_req_fields.js");
const modelRecords = require("../models/records");
const modelExercises = require("../models/exercises");
const modelUsers = require("../models/users");

const check = require('../helpers/check')
const retrieve = require('../helpers/retreive')
// MIDDLEWARE

check_required = (req, res, next) => {
  const required_fields = ['username', 'exercise']

  //check if all required fields are in the request body
  //required_fields must be preceded by ... not sure why
  const requirements_met = check.required(req.body, ...required_fields)
  if(!requirements_met) {
    //612 is probably not the right status code
    return res.status(612).json({message: `Required fields are: ['username', 'exercise_name' or 'exercise_id'].`})
  }

  next()
}

prepare_new = async (req, res, next) => {
  const user = await retrieve.user_by_username(req.body.username)
  if(!user)
    return res.status(404).json({message: `Username ${req.body.username} couldn't be found.`})
  const exercise = await retrieve.exercise(req.body.exercise)
  if(!exercise)
    return res.status(404).json({message: `Exercise ${req.body.exercise} couldn't be found.`})

  req.body = {
    rid: uuid.v4(),
    uid: user.uid,
    eid: exercise.eid,
    duration: req.body.duration,
    repetitions: req.body.repetitions,
    distance: req.body.distance,
    heart_rate: req.body.heart_rate,
    weight: req.body.weight,
    calories: req.body.calories,
    datetime: req.body.dateTime
  }

  next()
}

get = async (req, res, next) => {
  let record = await modelRecords.get_record_by({ rid: req.params.rid });
  if (!record) return next(`Sorry, can not find that record.`);

  req.body = record;
  next();
};

// adding a record

add = async (req, res, next) => {
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
    eid: req.body.eid
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
    dateTime: req.body.dateTime
  };
  next();
};

// remove a record
remove = async (req, res, next) => {
  // check if record exists
  let record = await modelRecords.get_record_by({ rid: req.params.rid });
  if (!record) return next(`Could not find record ${req.params.rid}`);

  req.body = record;

  next();
};

//EXPORTS
module.exports = {
  check_required,
  prepare_new,
  add,
  get
};
