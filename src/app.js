const express = require('express');
const db = require('./database/database');
const apiRoutes = require('./routes/index');
const errorRoutes = require('./middlewares/index');
require('dotenv').config();

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
apiRoutes(app);
//error handler
errorRoutes(app);


async function testConnection() {
    try {
        // await db.authenticate();
        // console.log('Connection has been established successfully.');
        // await db.sync({ force: true });
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
    }

testConnection();