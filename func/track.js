const axios = require("axios");

exports.handler = async (event, context) => {
  const { ipAdd } = event.queryStringParameters;
  function getIP(){
    if(ipAdd){
      return ipAdd;
    }else{
      if(event.headers["x-forwarded-for"]){
        return event.headers["x-forwarded-for"].split(",").shift();
      }else if(event.headers["client-ip"]){
        return event.headers["client-ip"];
      }else{
        return "1.1.1.1"
      }
    }
  }
  
  try {
    const { data } = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ip_address=${getIP()}`);
    const res = {
      ip: data.ip_address,
      location : {
        lat: data.latitude,
        lng: data.longitude,
        city: data.city ? data.city : "",
        state: data.region ? data.region : "",
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
