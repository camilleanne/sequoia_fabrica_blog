const fs = require("fs");
const getWeather = require("./weather.js");
const getPowerData = require("./powerinfo.js");

const STATS_FILE = "/var/www/html/api/stats.json";

getWeather()
    .then((weatherData) => {
        const powerData = getPowerData();

        const statsObject = { ...powerData, ...weatherData };

        fs.writeFileSync(STATS_FILE, JSON.stringify(statsObject, null, 2));
    })
    .catch((err) => console.error(err));
