const axios = require("axios");

exports.handler = async (event, context) => {
  const { ipAdd } = event.queryStringParameters;
  try {
    const req = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}?ip_address=${ipAdd}`);
    /*const res = {
      ip: req.ip_address,
      location : {
        lat: req.latitude,
        lng: req.longitude,
        city: req.city,
        state: req.region,
        country: req.country_code
      },
      timezone: req.timezone.gmt_offset,
      isp: req.connection.isp_name
    };*/
    return {
      statusCode: 200,
      body: JSON.stringify(req)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    }
  }
}
