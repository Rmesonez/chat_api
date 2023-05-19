const express = require('express');
const db = require('./database/database');
const usersRoutes = require('./routes/users.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');
const conversationsRoutes = require('./routes/conversations.routes.js');
const typesRoutes = require('./routes/types.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const usersConversationsRoutes = require('./routes/usersConversations.routes.js');
const {
    logError,
    errorHandler
} = require('./middlewares/errorHandler.middleware.js');
require('dotenv').config();

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;


//middlewares
app.use(cors());
app.use(express.json());
app.use(usersRoutes, authRoutes, messagesRoutes, conversationsRoutes, typesRoutes, usersConversationsRoutes);

app.use(logError, errorHandler);

//404 handler
app.use('*', (req, res) => res.status(404).json(
    { 
        message: 'The route you want to get is temporaly broken, please try again later.' 
    }));

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