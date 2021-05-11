const axios = require("axios");

exports.handler = async (event, context) => {
  const { ipAdd } = event.queryStringParameters;
  try {
    const { data } = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ip_address=${ipAdd}`);
    const res = {
      ip: data.ip_address,
      location : {
        lat: data.latitude,
        lng: data.longitude,
        city: data.city,
        state: data.region,
        country: data.country_code
      },
      timezone: data.timezone.gmt_offset,
      isp: data.connection.isp_name
    };
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    }
  }
}
