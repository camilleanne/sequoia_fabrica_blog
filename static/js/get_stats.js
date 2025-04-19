const fs = require("fs");
const getWeather = require("./weather.js");
const getPowerData = require("./powerinfo.js");

const STATS_FILE = "/var/www/html/api/stats.json";
const LOG = true;

getWeather()
    .then((weatherData) => {
        const powerData = getPowerData();

        const statsObject = JSON.stringify(
            { ...powerData, ...weatherData },
            null,
            2
        );

        fs.writeFileSync(STATS_FILE, statsObject);
        if (LOG) {
            console.log("Stats written to", STATS_FILE);
            console.log(statsObject);
        }
    })
    .catch((err) => console.error(err));
