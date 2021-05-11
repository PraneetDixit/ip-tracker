const axios = require("axios");

exports.handler = async (event, context) => {
  return{
    statusCode: 500,
    body: "Something went wrong"
  }
}
