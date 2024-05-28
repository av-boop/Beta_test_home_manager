const knex = require("../db/connection");

const getHouseholdMember = (id) => {
    return knex("household_members").where({ id }).first();
};

const createHouseholdMember = (member_name) => {
    return knex("household_members")
        .insert({ member_name })
        .returning("*")
        .then((rows) => rows[0]); // Return the first element of the array
};

const getAllHouseholdMembers = () => {
    return knex("household_members").select("*");
};

module.exports = {
    getHouseholdMember,
    createHouseholdMember,
    getAllHouseholdMembers,
};
