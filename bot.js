const mineflayer = require('mineflayer');
const http = require('http');

// Define the server IP and port
const serverIP = 'infinitefun.falixsrv.me';  // Corrected IP from your original code
const serverPort = 28007;
const version = '1.20.2';

// Bot names for ServerManager1, ServerManager2, and ServerManager3
const botNames = ['ServerManager1', 'ServerManager2', 'ServerManager3'];

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
    });

    bot.on('error', (err) => {
        console.error(`${username} encountered an error:`, err);
        process.exit(1);  // Exit the entire process on error
    });

    bot.on('end', () => {
        console.log(`${username} has been disconnected`);
        process.exit(1);  // Exit the entire process on disconnection
    });

    return bot;
}

// Function for ServerManager1 to join for 3 minutes, leave for 1 minute, and repeat
function serverManager1Cycle() {
    const bot = createBot('ServerManager1');

    setInterval(() => {
        console.log('ServerManager1 is joining the server...');
        bot._client.write('login', { username: 'ServerManager1' });

        // Stay for 3 minutes
        setTimeout(() => {
            console.log('ServerManager1 is leaving the server...');
            bot.quit();
        }, 3 * 60 * 1000); // Stay for 3 minutes
    }, 4 * 60 * 1000); // 3 minutes join + 1 minute leave
}

// Function for ServerManager2 to join for 3 minutes, leave for 1 minute, and repeat
function serverManager2Cycle() {
    const bot = createBot('ServerManager2');

    setInterval(() => {
        console.log('ServerManager2 is joining the server...');
        bot._client.write('login', { username: 'ServerManager2' });

        // Stay for 3 minutes
        setTimeout(() => {
            console.log('ServerManager2 is leaving the server...');
            bot.quit();
        }, 3 * 60 * 1000); // Stay for 3 minutes
    }, 4 * 60 * 1000); // 3 minutes join + 1 minute leave
}

// Function for ServerManager3 to join for 3 minutes, leave for 1 minute, and repeat
function serverManager3Cycle() {
    const bot = createBot('ServerManager3');

    setInterval(() => {
        console.log('ServerManager3 is joining the server...');
        bot._client.write('login', { username: 'ServerManager3' });

        // Stay for 3 minutes
        setTimeout(() => {
            console.log('ServerManager3 is leaving the server...');
            bot.quit();
        }, 3 * 60 * 1000); // Stay for 3 minutes
    }, 4 * 60 * 1000); // 3 minutes join + 1 minute leave
}

// Start all bot cycles with staggered start times
function startBotCycles() {
    setTimeout(serverManager1Cycle, 0 * 60000); // ServerManager1 starts at 0 minutes
    setTimeout(serverManager2Cycle, 1 * 60000); // ServerManager2 starts at 1 minute
    setTimeout(serverManager3Cycle, 2 * 60000); // ServerManager3 starts at 2 minutes
}

// Start the bot actions
startBotCycles();

// HTTP Server to respond to pings
http.createServer((req, res) => {
    console.log('Received a ping request');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
}).listen(process.env.PORT || 3000, () => {
    console.log('HTTP Server running!');
});
