const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const url = "https://api.darksky.net/forecast/3ddd961e72f01a216cfd592fb1f820ea/" + longitude + "," + latitude + "?units=si" ;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined);
        } else if(body.error) {
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. and the low is " + body.daily.data[0].temperatureLow + " with a high of " + body.daily.data[0].temperatureHigh + ". and There is " + body.currently.precipProbability + " chance of rain.");
        }
    });
}

module.exports = forecast;