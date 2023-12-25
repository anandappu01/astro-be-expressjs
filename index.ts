import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { loginUser, userLogin } from './src/controller/auth.controller';
import { getAllUsers, getUsedHistory } from './src/controller/user.controller';
import { getAllNatchathiram } from './src/controller/main.controller';


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
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});
app.route('/api/login').post(loginUser);
app.route('/api/login2').post(userLogin);
app.route('/api/getAllUsers').post(getAllUsers);
app.route('/api/getAllNatchathiram').post(getAllNatchathiram);
app.route('/api/getUsedHistory').post(getUsedHistory);


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});