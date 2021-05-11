const http = require("http");

exports.handler = async (event, context) => {
  const options = {
    hostname: 'https://geo.ipify.org/',
    port: 443,
    path: '/api/v1?apiKey=at_CY48XydVQZP15tmrwYEgdGtWTsMLQ&ipAddress=8.8.8.8',
    method: 'GET'
  }
  let req = await http.request(options);
  return req;
}
