import config from "dotenv";
let config_output = config.config().parsed || {};
export default config_output;