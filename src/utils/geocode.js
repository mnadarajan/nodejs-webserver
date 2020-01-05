const request = require('request')

address = 'buffalo'
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmFkYXJhamFubSIsImEiOiJjazR4Mnp3OHgwdXkwM21vOWUwN202b3Y3In0.Fb0TZ-IIPbPpplUvVy1PkQ&limit=1'
    //console.log(address)
    //console.log(url)
    request({ url, json: true,strictSSL:false }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback({error:'Unable to find location. Try another search.'}, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode