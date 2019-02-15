//Código optimizado de app.js

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs')
    //options es para pasar directamente el parametro, sin la palabra "listar", "crear", etc
    .options({
        direccion: {
            alias: 'd',
            desc: 'Dirección de la ciudad para obtener el clima',
            demand: true
        }
    }).argv;


//Unifico las llamadas getLugarLatLong y getClima
let getInfo = async(direccion) => {

    try {
        let coords = await lugar.getLugarLatLong(direccion);
        let temperatura = await clima.getClima(coords.lat, coords.long);

        return `El clima en ${ coords.direccion } es de ${ temperatura } C`;
    } catch (e) {
        return `No se pudo determinar el clima en ${ direccion }`;
    }
}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err))

// lugar.getLugarLatLong(argv.direccion)
//     .then(resp => {
//         console.log(resp)
//     })
//     .catch(err => console.log(err))

// clima.getClima(1, 139)
//     .then(temp => console.log(temp))
//     .catch(err => console.log('Error', err))

//Para probar en consola:   node app2 -d "Rafaela Santa Fe"