const axios = require("axios");

exports.handler = async (event, context) => {
  const { ipAdd } = event.queryStringParameters;
//   function getIP(){
//     if(ipAdd){
//       return ipAdd;
//     }else{
//       if(event.headers["x-forwarded-for"]){
//         return event.headers["x-forwarded-for"].split(",")[0]
//       }else if(event.headers["client-ip"]){
//         return event.headers["client-ip"];
//       }else{
//         return "1.1.1.1"
//       }
//     }
//   }
  
  try {
    const { data } = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=8786da250eb24a07a9e133eba7e29357& ip_address=2409:4052:680:be03:3527:630d:bb86:9348`);
//     const res = {
//       ip: data.ip_address,
//       location : {
//         lat: data.latitude,
//         lng: data.longitude,
//         pin: data.postal_code,
//         city: data.city,
//         state: data.region,
//         country: data.country_code
//       },
//       timezone: data.timezone.gmt_offset,
//       isp: data.connection.isp_name
//     };
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    }
  }
}
