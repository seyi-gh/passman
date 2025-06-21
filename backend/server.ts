import app from './app.js';
import config from './config.js';

app.listen(config.port_web, () => {
  console.log(`> Web server is running in uri [http://localhost:${config.port_web}]`);
})