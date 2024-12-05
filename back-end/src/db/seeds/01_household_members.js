// back-end/src/db/seeds/01_household_members.js
const household_members = require("./01_household_members.json");

exports.seed = function (knex) {
  return knex('household_members').del()
    .then(function () {
      return knex("household_members").insert(household_members);
    });
};
