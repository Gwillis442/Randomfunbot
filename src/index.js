// Desc: Entry point for the bot
require('./client.js'); 
// Desc: Handlers
require('./handlers/messageHandlers/linkHandler.js'); // Link posting Handler
require('./handlers/messageHandlers/messageDeletionHandler.js'); // Message Deletion Handler
require('./handlers/messageHandlers/randomResponseHandler.js'); // Random Response Handler
require('./handlers/commandHandler/commandHandler.js'); // Command Handler
require('./handlers/buttonHandler/buttonHandler.js'); // Button Handler