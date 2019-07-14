// IMPORTS

const uuid = require("uuid");

// local

const check_fields = require("../helpers/check_req_fields.js");
const modelRecords = require("../models/records");
const modelExercises = require("../models/exercises");
const modelUsers = require("../models/users");

const check = require('../helpers/check')
const updater = require('../helpers/update_body')
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
  const record = await retrieve.record(req.params.record)
  if(!record)
    return res.status(404).json({message: `Can't find record ${req.params.record}`})
  req.body.x = record
  next()
}

update = async (req, res, next) => {
  req.body = updater(req.body.x, req.body)
  next()
}

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
  update,
  get
};
