const mineflayer = require('mineflayer');
const http = require('http');

// Define the server IP and port
const serverIP = 'infinitesmpvelocity.falixsrv.me';  // Corrected IP from your original code
const serverPort = 29167;
const version = '1.20.2';

// Function to create and handle a bot
function createBot(username) {
    const bot = mineflayer.createBot({
        host: serverIP,
        port: serverPort,
        username: username,
        version: version,
    });

    bot.on('spawn', () => {
        console.log(`${username} has joined the server!`);

        // Leave the server after 3 minutes
        setTimeout(() => {
            if (bot) {
                console.log(`${username} is leaving the server!`);
                bot.quit();
            }
        }, 3 * 60 * 1000); // 3 minutes
    });

    bot.on('chat', (username, message) => {
        // Ignore chat messages
    });

    bot.on('error', (err) => {
        console.error(`${username} encountered an error:`, err);
        if (bot) {
            bot.quit();
        }
    });

    bot.on('end', () => {
        console.log(`${username} has left the server!`);
        // Reconnect the bot after 1 minute
        setTimeout(() => {
            createBot(username); // Recreate the bot after 1 minute
        }, 60000); // Wait for 1 minute before rejoining
    });

    return bot;
}

// Cycle for ServerManager1: Joins for 3 minutes, leaves for 1 minute
function serverManager1Cycle() {
    const bot = createBot('ServerManager1');
}

// Cycle for ServerManager2: Joins for 3 minutes, leaves for 1 minute
function serverManager2Cycle() {
    const bot = createBot('ServerManager2');
}

// Cycle for ServerManager3: Joins for 3 minutes, leaves for 1 minute
function serverManager3Cycle() {
    const bot = createBot('ServerManager3');
}

// Start all bot cycles with staggered start times
function startBotCycles() {
    setTimeout(serverManager1Cycle, 0 * 60000); // ServerManager1 starts at 0 minutes
    setTimeout(serverManager2Cycle, 1 * 60000); // ServerManager2 starts at 1 minute
    setTimeout(serverManager3Cycle, 2 * 60000); // ServerManager3 starts at 2 minutes
}

// Start the bot cycles
startBotCycles();

// HTTP Server to respond to pings
http.createServer((req, res) => {
    console.log('Received a ping request');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
}).listen(process.env.PORT || 3000, () => {
    console.log('HTTP Server running!');
});
