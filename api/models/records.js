// IMPORTS

// local

const db = require("../../data/config.js");

// MODELS

// create

const add_record = async record => {
  await db("records").insert(record);
  return get_record_by({ rid: record.rid });
};

// read

const get_all_records = async () => await db("records");

const get_record_by = async value =>
  await db("records")
    .where(value)
    .first();

const get_user_records = async (username) => 
  await db.select('records.*')
    .from('records')
    .join('users', {'users.uid': 'records.uid'})
    .where({'users.username': username})

const get_user_records_by_exercise = async (username, exercise) =>
  await db.select('records.*')
    .from('records')
    .join('users', {'users.uid': 'records.uid'})
    .where({username: username})
    .join('exercises', {'exercises.eid': 'records.eid'})
    .where({'exercises.name': exercise})
    .orWhere({'exercises.eid': exercise})
// update

const update_record = async (id, record) => {
  return await db("records")
    .where({ rid: id })
    .update(record);
};

// delete

const remove_record = async rid =>
  await db("records")
    .where({ rid: rid })
    .delete();

// EXPORT

module.exports = {
  add_record,
  get_all_records,
  get_user_records,
  get_user_records_by_exercise,
  get_record_by,
  update_record,
  remove_record
};
