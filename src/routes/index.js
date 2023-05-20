const userRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const conversationRoutes = require('./conversations.routes');
const messageRoutes = require('./messages.routes');
const typeRoutes = require('./types.routes');
const usersConversationRoutes = require('./usersConversations.routes');

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(conversationRoutes);
    app.use(messageRoutes);
    app.use(typeRoutes);
    app.use(usersConversationRoutes);
}

module.exports = apiRoutes;