const argv = require("./config/yargs").argv;
const googleApi = require('./config/google-api');
const weatherApi = require('./config/weather-api');
const colors = require('colors');

let obtieneClima = async(ciudad) => {
    let resultadoClima = {};
    try {

        let coord = await googleApi.getLugarLngLat(ciudad);
        let clima = await weatherApi.getClimaByLatLong(coord.lat, coord.lng);
        resultadoClima = {
            direccion: coord.direccion,
            lat: coord.lat,
            lng: coord.lng,
            tempPromedio: clima.tempPromedio,
            tempMinima: clima.tempMinima,
            tempMaxima: clima.tempMaxima
        }
    } catch (error) {
        resultadoClima = {
            error: true,
            mensajeError: `No se pudo obtener la informacion de la ciudad ${ciudad}`
        }
    }
    return resultadoClima;
}

obtieneClima(argv.c).then((res) => {
    if (res.error) {
        console.log(res.mensajeError.red);
    } else {
        console.log('##############Clima#############')
        console.log(`La ciudad ${res.direccion.gray} con latitud ${res.lat} y longitud ${res.lng}`)
        console.log('Tiene una temperatura promedio de :', (res.tempPromedio + '').green);
        console.log('Tiene una temperatura minima de :', (res.tempMinima + '').blue);
        console.log('Tiene una temperatura máxima de :', (res.tempMaxima + '').red);
        console.log('################################')

    }
}).catch(err => console.log(err));