const { spawn } = require('child_process');

// Function to start the bot script
function startBotScript() {
    const botScript = spawn('node', ['bot.js']);  // Replace 'bot.js' with the name of your bot script file

    // Log the bot script output to the console
    botScript.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    botScript.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    botScript.on('close', (code) => {
        console.log(`Bot script exited with code ${code}`);
        if (code !== 0) {
            console.log('Bot script crashed! Restarting...');
            startBotScript();  // Restart the script if it crashes
        }
    });
}

// Start the bot script for the first time
startBotScript();
