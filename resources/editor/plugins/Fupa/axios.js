const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost/asgard/public/en/api/fupa/"
});

module.exports = instance;
