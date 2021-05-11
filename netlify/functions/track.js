const https = require("https");

exports.handler = async (event, context) => {
  https.get('https://geo.ipify.org/api/v1?apiKey=at_TEYGZ5THakrXcYjy5H5MZLVnbuFgl&ipAddress=1.1.1.1', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    });
  }).on("error", (err) => {
    return {
      statusCode: 500,
      body: `Error:${err.message}`
    }
  });
  return {
    statusCode: 500,
    body: "Something went wrong"
  }
}
