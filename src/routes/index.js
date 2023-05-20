const userRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const conversationRoutes = require('./conversation.routes');
const messageRoutes = require('./message.routes');
const typeRoutes = require('./type.routes');
const usersConversationRoutes = require('./usersConversation.routes');

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(conversationRoutes);
    app.use(messageRoutes);
    app.use(typeRoutes);
    app.use(usersConversationRoutes);
}

module.exports = apiRoutes;