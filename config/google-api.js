const axios = require('axios');
let getLugarLngLat = async(direccion) => {

    let resGoogle = {}
    let ciudad = encodeURI(direccion);

    let resultado = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ciudad}&key=AIzaSyBGQa1-JGDTFQALf84ToOWZTVIr7CMteGE`)

    if (resultado.data.status !== "OK") {
        throw new Error(`Pinche ciudad rara que pusiste ${direccion}`)
    } else {
        resGoogle.direccion = resultado.data.results[0].formatted_address
        resGoogle.lat = resultado.data.results[0].geometry.location.lat;
        resGoogle.lng = resultado.data.results[0].geometry.location.lng;
    }
    return resGoogle;
};

module.exports = {
    getLugarLngLat
}