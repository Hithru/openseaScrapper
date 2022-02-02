const axios = require("axios").default;
const fs = require("fs");
const options = {
  method: "GET",
  url: "https://api.opensea.io/api/v1/assets?collection=eth-men&offset=0&limit=8",
  headers: {
    Accept: "application/json",
    "X-API-KEY": "5bec8ae0372044cab1bef0d866c98618",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
    let data = JSON.stringify(response.data);
    fs.writeFileSync(`raw.json`, data);
  })
  .catch(function (error) {
    console.error(error);
  });
