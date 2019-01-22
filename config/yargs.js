const argv = require('yargs').options({
    ciudad: {
        alias: "c",
        description: "Ciudad que se quiere saber el clima",
        demand: true
    }
}).help().argv;

module.exports = {
    argv
}