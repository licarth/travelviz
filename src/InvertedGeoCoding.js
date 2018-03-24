
import request from "superagent";

export function invertGeoCode(latlng){
    return request
    .get('https://maps.googleapis.com/maps/api/geocode/json')
    .query({
        key: "AIzaSyBDVXClEZonIcG76-_kVfhzApvP87vFnYw",
        latlng: `${latlng.lat},${latlng.lng}`,
        language: "fr",
        result_type: "locality",
    })
    .set('accept', 'json')
    .then((res) => {
        const name = res.body.results[0].formatted_address;
        return name;
    });
}

