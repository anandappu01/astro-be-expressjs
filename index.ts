import express, { Application } from 'express';
import dotenv from 'dotenv';
import { loginUser, userLogin } from './src/controller/auth.controller';
import { getAllUsers, getUsedHistory, getUserDetailsById } from './src/controller/user.controller';
import { getAllNatchathiram, landingPage } from './src/controller/main.controller';
import { getAstroChart } from './src/controller/prediction.controller';


//For env File 
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing handle here
app.route('/').get(landingPage);
// app.route('/api/login').post(loginUser);
app.route('/api/login').post(userLogin);
app.route('/api/getAllUsers').post(getAllUsers);
app.route('/api/getUserDetailsById').post(getUserDetailsById);
app.route('/api/getAllNatchathiram').post(getAllNatchathiram);
app.route('/api/getUsedHistory').post(getUsedHistory);
app.route('/api/getChart').post(getAstroChart);


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});