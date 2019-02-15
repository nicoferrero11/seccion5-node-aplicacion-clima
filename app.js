//Axios es para llamar a APIs
const axios = require('axios');

const argv = require('yargs')
    //options es para pasar directamente el parametro, sin la palabra "listar", "crear", etc
    .options({
        direccion: {
            alias: 'd',
            desc: 'Dirección de la ciudad para obtener el clima',
            demand: true
        }
    }).argv;

//console.log(argv.direccion);

//Hacemos una URL amigable (por el tema de espacios y demas)
let encodeUrl = encodeURI(argv.direccion);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeUrl }&key=AIzaSyDjKpBYhHp0ZozvfR-qRWUXI2_gtR9hp1A`)
    .then(respuesta => {
        console.log(respuesta.status); //Estado petición
        //console.log(respuesta.data); //Datos como vienen, lo vamos a transformar en JSON
        //console.log(JSON.stringify(respuesta.data, undefined, 2)); //De esta respuesta, quiero obtener ciertos datos


        let location = respuesta.data.results[0];

        if (location == null) {
            console.log('Reintentar', respuesta.data);
        } else {
            let coords = location.geometry.location;

            console.log('Dirección formateada: ', location.formatted_address);
            console.log('Latitud: ', coords.lat);
            console.log('Longitud: ', coords.lng);
        }
    })
    .catch(e => console.log('ERROR: ', e))

//Para probar en consola:   node app -d "Rafaela Santa Fe"