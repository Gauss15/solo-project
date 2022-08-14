require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT 
// const PORT = 8000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded( { extended: true } ) );

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

require("./config/mongoose.config");
require("./routes/warframe.routes")(app);
require("./routes/user.routes")(app);


app.listen( PORT, () => console.log(`Running on Port ${PORT}`) );