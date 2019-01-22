const axios = require('axios');

let getClimaByLatLong = (async(latitud, longitud) => {
    let latURI = encodeURI(latitud);
    let longURI = encodeURI(longitud);
    let respClima = {};
    let resultado = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latURI}&lon=${longURI}&appid=ae816b8e8d1f5e316498d67ef373ccaa&units=metric`);

    if (resultado.status === 200 && resultado.data.cod === 200) {
        respClima = {
            tempPromedio: resultado.data.main.temp,
            tempMaxima: resultado.data.main.temp_max,
            tempMinima: resultado.data.main.temp_min
        }
    } else {

        return new Error(`No existe la informacion para la latitud ${latitud} y longitud ${longitud}`);
    }

    return respClima;
});

module.exports = {
    getClimaByLatLong
}