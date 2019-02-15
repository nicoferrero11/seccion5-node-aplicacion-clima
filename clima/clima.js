const axios = require('axios');

const getClima = async(lat, long) => {

    let respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ long }&units=metric&appid=2f177ea8fb997ecd0554f498d54bd873`);

    if (respuesta.data.cod != 200) {
        console.log(respuesta);
        throw new Error('Latitud o longitud incorrecta');
    }

    let temperatura = respuesta.data.main.temp;

    return temperatura;
}

module.exports = {
    getClima
}