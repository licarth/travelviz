import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import request from "superagent"
import _ from "lodash";
import moment from "moment"

const tripsMapping = (json) => _.map(json.trips,
    ({ departure_date, duration }) => {
      const departureMoment = moment(departure_date, "DD/MM/YYYY HH:mm:ss");
      const arrivalMoment = departureMoment.clone().add(duration.value, duration.unity);
      return {
        departureMoment,
        arrivalMoment,
      };
    });

export const blablacar = ({
    departureMoment,
    departure,
    arrival
}) => {
    return request
        .get('https://public-api.blablacar.com/api/v2/trips')
        .query({
            key: "a6c44414647b42c090ae15e2cc51a6be",
            fc: `${departure.latlng.lat}|${departure.latlng.lng}`,
            tc: `${arrival.latlng.lat}|${arrival.latlng.lng}`,
        }) // sends a JSON post body
        // .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .then((res) => {
            return tripsMapping(res.body);
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