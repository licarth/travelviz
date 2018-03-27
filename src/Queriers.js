import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import request from "superagent"
import _ from "lodash";
import moment from "moment"
import uuidv4 from 'uuid/v4';

const segmentMapping = (json) => _.map(json.trips,
    ({ departure_date, duration }) => {
        const departureMoment = moment(departure_date, "DD/MM/YYYY HH:mm:ss");
        const arrivalMoment = departureMoment.clone().add(duration.value, duration.unity);
        return {
            departureMoment,
            arrivalMoment,
            id: uuidv4()
        };
    });

export const blablacar = ({
    departureMoment,
    departureArea,
    arrivalArea,
}) => {
    return request
        .get('https://public-api.blablacar.com/api/v2/trips')
        .query({
            key: "a6c44414647b42c090ae15e2cc51a6be",
            fc: `${departureArea.latlng.lat}|${departureArea.latlng.lng}`,
            tc: `${arrivalArea.latlng.lat}|${arrivalArea.latlng.lng}`,
            limit: 100,
            radius: 10,
        }) // sends a JSON post body
        // .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .then((res) => {
            return segmentMapping(res.body);
            // Calling the end function will send the request
        });
}

const place = PropTypes.shape({
    latlng: PropTypes.shape({
        lng: PropTypes.number,
    })
});

blablacar.propTypes = {
    departureMoment: MomentPropTypes.momentObj,
    departure: place,
    arrival: place,
}
    ;