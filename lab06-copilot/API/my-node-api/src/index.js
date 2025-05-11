const express = require('express');
const bodyParser = require('body-parser');
const postalCodeRoute = require('./routes/postalCodeRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', postalCodeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});