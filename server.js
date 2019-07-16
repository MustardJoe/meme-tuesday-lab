require('dotenv').config();
require('./lib/utils/connects')();

const app = require('./lib/app');

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  //eslint-disable-next-line no-console
  console.log(`Hal-2000 up and running on port ${PORT}.  I'm sorry Dave, I can't do that...`);
});
