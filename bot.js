const mineflayer = require('mineflayer');
const http = require('http');

// Define the server IP and port
const serverIP = 'infinitefun.falixsrv.me';
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

    bot.on('ping', () => {
        console.log(`Received ping from ${username}`);
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

// Function to start the bots and schedule their actions
function scheduleBotActions() {
    let times = [0, 1, 2]; // Time delays for joining: ServerManager1 -> 0 mins, ServerManager2 -> 1 min, ServerManager3 -> 2 min
    let intervals = [3 * 60 * 1000, 1 * 60 * 1000]; // 3 mins join, 1 min leave

    const bots = botNames.map(name => createBot(name));

    botNames.forEach((name, index) => {
        const bot = bots[index];
        const joinDelay = times[index] * 60000; // Convert minutes to milliseconds
        setTimeout(() => {
            setInterval(() => {
                console.log(`${name} is joining the server...`);
                bot._client.write('login', { username: name });

                // After 3 minutes, leave for 1 minute
                setTimeout(() => {
                    console.log(`${name} is leaving the server...`);
                    bot.quit();
                }, intervals[0]);

            }, intervals[0] + intervals[1]); // Repeat the cycle
        }, joinDelay); // Start with the appropriate delay
    });
}

// Start the bot actions
scheduleBotActions();

// HTTP Server to respond to pings
http.createServer((req, res) => {
    console.log('Received a ping request');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
}).listen(process.env.PORT || 3000, () => {
    console.log('HTTP Server running!');
});
