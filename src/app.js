const express = require('express');
const db = require('./database/database');
const usersRoutes = require('./routes/users.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');
const conversationsRoutes = require('./routes/conversations.routes.js');
const typesRoutes = require('./routes/types.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const usersMessagesRoutes = require('./routes/usersMessages.routes.js');
require('dotenv').config();

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;


//middlewares
app.use(cors());
app.use(express.json());
app.use(usersRoutes, authRoutes, messagesRoutes, conversationsRoutes, typesRoutes, usersMessagesRoutes);

async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        });
        await db.sync({ force: false });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
    }

testConnection();