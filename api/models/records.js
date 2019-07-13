// IMPORTS

// local

const db = require("../../data/config.js");

// MODELS

// create

const add_record = async record => {
  await db("record").insert(record);
  return get_record_by({ rid: exercise.rid });
};

// read

const get_all_records = async () => await db("records");

const get_record_by = async value =>
  await db("records")
    .where(value)
    .first();

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
  get_record_by,
  update_record,
  remove_record
};
