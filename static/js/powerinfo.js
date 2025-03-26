const fs = require("fs");
const path = require("path");

// --- Adjust these paths as needed ---
const BATTERY_PATH = "/sys/class/power_supply/axp20x-battery";
const AC_PATH = "/sys/class/power_supply/axp20x-ac";
const CPU_TEMP_PATH = "/sys/class/thermal/thermal_zone0/temp";
const LOADAVG_PATH = "/proc/loadavg";
const UPTIME_PATH = "/proc/uptime";

// Helper: read file contents as string
function readFileString(filePath) {
  return fs.readFileSync(filePath, "utf-8").trim();
}

// Helper: parse a “uevent” file into { key: value } object
function parseUevent(contents) {
  // Each line is `KEY=value`
  const lines = contents.split("\n");
  const data = {};
  for (const line of lines) {
    const [key, val] = line.split("=");
    data[key] = val;
  }
  return data;
}

// Read and parse the battery “uevent”
function getBatteryInfo() {
  const ueventStr = readFileString(path.join(BATTERY_PATH, "uevent"));
  const info = parseUevent(ueventStr);
  return info;
}

// Read and parse the AC “uevent”
function getAcInfo() {
  const ueventStr = readFileString(path.join(AC_PATH, "uevent"));
  const info = parseUevent(ueventStr);
  return info;
}

// Get CPU temperature (in °C, from millidegrees C)
function getCpuTemperature() {
  // e.g. reading “60000” means 60.0 °C
  const tempMilliC = parseInt(readFileString(CPU_TEMP_PATH), 10);
  return (tempMilliC / 1000).toFixed(1);
}

// Get 1, 5, and 15-minute load average
function getLoadAverages() {
  // e.g. “1.47 1.34 1.20 2/1234 5678”
  const contents = readFileString(LOADAVG_PATH);
  const [load1, load5, load15] = contents.split(" ").map(parseFloat);
  return { load1, load5, load15 };
}

// Get uptime (in seconds)
function getUptime() {
  // e.g. “12345.67 23456.78”
  const contents = readFileString(UPTIME_PATH);
  const [uptimeSeconds] = contents.split(" ");
  return parseFloat(uptimeSeconds);
}

// Main gather function
function getPowerData() {
  const battery = getBatteryInfo();
  const ac = getAcInfo();

  // Convert microvolts -> volts and microamps -> amps if needed
  // According to the AXP20x driver, current_now is in microamps, voltage_now in microvolts
  // If your kernel scales them differently, adjust accordingly

  const batteryVoltage = parseFloat(battery.POWER_SUPPLY_VOLTAGE_NOW) / 1e6; // e.g. 4.504 V
  const batteryCurrent = parseFloat(battery.POWER_SUPPLY_CURRENT_NOW) / 1e6; // e.g. 0 A
  const batteryCapacity = battery.POWER_SUPPLY_CAPACITY; // e.g. "100" (percent)

  const acVoltage = parseFloat(ac.POWER_SUPPLY_VOLTAGE_NOW) / 1e6; // e.g. 5.057 V
  const acCurrent = parseFloat(ac.POWER_SUPPLY_CURRENT_NOW) / 1e6; // e.g. 0.353 A

  // Estimate power usage (for demonstration, we take AC side as system consumption)
  // P = V * I, so for 5.057 V * 0.353 A = ~1.78 W
  const powerUsage = (acVoltage * acCurrent).toFixed(2);

  // Check if the battery is charging or not
  // "POWER_SUPPLY_STATUS" could be "Charging", "Discharging", "Full", etc.
  // You can unify "Full" as also not actively charging, or treat them differently.
  let charging = false;
  if (
    battery.POWER_SUPPLY_STATUS === "Charging" ||
    battery.POWER_SUPPLY_STATUS === "Full"
  ) {
    charging = true;
  }

  // CPU temperature
  const cpuTemp = getCpuTemperature();

  // Load averages
  const { load15 } = getLoadAverages();

  // Build the data object that your populateData() function expects
  return {
    local_time: new Date().toLocaleString(),
    uptime: (getUptime() / 3600).toFixed(2) + " hours", // or format more nicely
    W: powerUsage + " W",
    A: acCurrent.toFixed(3) + " A",
    V: acVoltage.toFixed(3) + " V",
    temperature: cpuTemp,
    load_15: load15,
    charging: charging ? "Yes" : "No",
    charge: batteryCapacity,
  };
}

// // This function would be invoked by your Node.js server or script
// function main() {
//   const data = gatherData();

//   // Here’s how you might produce the final snippet for a web page.
//   // (In a real system, you might pass `data` to a template engine, or serve as JSON.)
//   const script = `
//     <script>
//     function populateData(data) {
//       let load = ((data.load_15 / 2) * 100).toFixed(2) + '%';
      
//       let general_stats = [
//         ["Local time", data.local_time],
//         ["Uptime", data.uptime],
//         ["Power usage", data.W],
//         ["Current draw", data.A],
//         ["Voltage", data.V],
//         ["CPU temperature", data.temperature + "°C"],
//         ["CPU load average *", load],
//         ["Solar panel active", data.charging],
//         ["Battery capacity", data.charge + "%"]
//       ];
      
//       let dl = document.getElementById('server');
//       dl.innerHTML = pushData(general_stats).join("");
//     }
//     // Immediately call with our data
//     populateData(${JSON.stringify(data)});
//     </script>
//   `;

//   console.log(script);
// }

module.exports = getPowerData;
