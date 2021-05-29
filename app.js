'use strict'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const fetch = require('node-fetch');
const querystring = require('querystring');

let requestBody = {
    grant_type: "client_credentials",
    client_id: "pxl-secadv",
    client_secret: "maarten_lust_geen_spruitjes",
    scope: "api1"
};

let url = "https://ventielshop.dubbadub.be:8081/connect/token";
let options = {
    method: "POST",
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify(requestBody)
};


fetch(url, options)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    }).then((token) => {
    console.log();
    console.log();
    console.log(`Access Token: ${token.access_token}`);


    url = "https://ventielshop.dubbadub.be/fiets";
    options = {
        headers: {
            "Authorization": `Bearer ${token.access_token}`,
            "Accept": "*/*"
        }
    }
    fetch(url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    }).then((data) => {
        console.log()
        console.log()
        console.log(data);

    })
}).catch((error) => {
    console.log(error);
});
