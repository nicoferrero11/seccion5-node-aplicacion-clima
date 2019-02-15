//Axios es para llamar a APIs
const axios = require('axios');

const getLugarLatLong = async(direccion) => {

    let encodeUrl = encodeURI(direccion);

    let respuesta = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeUrl }&key=AIzaSyBxuI2IGs5fOHfuX4_V0Ha3AnbqTJzoJLE`)

    if (respuesta.data.status == 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${ direccion }`);
    }

    let location = respuesta.data.results[0];
    let coords = location.geometry.location;

    return {
        direccion: location.formatted_address,
        lat: coords.lat,
        long: coords.lng
    }
}

module.exports = {
    getLugarLatLong
}