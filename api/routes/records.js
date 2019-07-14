// ENDPOINT: /api/records

// IMPORTS
const express = require("express");

// local
const mwRecord = require("../middleware/records");

// SETUP
const router = express.Router();

// models
const modelRecords = require("../models/records");

// ROUTES

// create
router.post("/", mwRecord.check_required, mwRecord.prepare_new, async (req, res) => {
  try {
    const record = await modelRecords.add_record(req.body);
    record
      ? res.status(201).json(record)
      : res.status(404).json({ message: `Record couldn't be added.` });
  } catch (err) {
    console.log("add record err:", err);
    res.status(500).json(err);
  }
});

// read
router.get('/', async (req, res) => {
  try {
    const records = await modelRecords.get_all_records()
    records.length > 0
    ? res.status(200).json(records)
    : res.status(404).json({message: `No records found.`})
  } catch (err) {
    console.log("Unable to comply", err);
    res.status(500).json(err);
  }
})
router.get("/:uid", async (req, res) => {
  try {
    const records = await modelRecords.get_record_by({ uid: req.body.uid });
    records
      ? res.status(200).json(records)
      : res.status(404).json({ message: `Couldn't get records` });
  } catch (err) {
    console.log("Unable to comply", err);
    res.status(500).json(err);
  }
});
router.get("/:uid/:eid", async (req, res) => {
  try {
    const record = await modelRecords.get_record_by({ eid: req.body.eid });
    record
      ? res.status(200).json(record)
      : res.status(404).json({
          messages: "Could not find a record for that exercise! Go make one!"
        });
  } catch (err) {
    console.log("Unable to comply", err);
    res.status(500).json(err);
  }
});

// update
router.put("/:uid/:eid", async (req, res) => {
  try {
    const record = await modelRecords.update_record(req.body.rid, req.body);
    record
      ? res.status(200).json(req.body)
      : res.status(404).json({ message: "Unable to update the record yo!" });
  } catch (err) {
    console.log(`update record by id err:`, err);
    res.status(500).json(err);
  }
});

// delete
router.delete("/:uid/:eid", async (req, res) => {
  try {
    (await modelRecords.remove_record(req.body.rid))
      ? res
          .status(200)
          .json({ message: `Record has been removed` })
      : res
          .status(404)
          .json({ message: `Record could not be deleted` });
  } catch (err) {
    console.log("remove record err:", err);
    res.status(500).json(err);
  }
});

//EXPORTS
module.exports = router;
