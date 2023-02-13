"use strict";

const fs = require("fs");
const path = require("path");
// Read in schema.json for reference to find which attribute is type of array
let schema = fs.readFileSync(path.resolve(__dirname, "../schema.json"));
let schema_obj = JSON.parse(schema);
let array_attributes = [];

for (var prop in schema_obj["$defs"]["Sample"]["properties"]) {
  //console.log(typeof schema_obj["$defs"]["Sample"]["properties"][`${prop}`]);
  if (
    schema_obj["$defs"]["Sample"]["properties"][`${prop}`].hasOwnProperty(
      "type"
    ) &&
    schema_obj["$defs"]["Sample"]["properties"][`${prop}`]["type"] == "array"
  ) {
    array_attributes.push(prop);
  }
}

// Read json file and replace array with string
let rawdata = fs.readFileSync(path.resolve(__dirname, "../converted.json"));
let samples = JSON.parse(rawdata);
samples.forEach((item, index, arr) => {
  array_attributes.forEach((att) => {
    if (item.hasOwnProperty(att)) {
      arr[index][`${att}`] = item[`${att}`].split(";");
    }
  });
});

// Write new json file
let data = JSON.stringify(samples);
fs.writeFileSync("final.json", data);
