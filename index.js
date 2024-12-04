//2024년도 송지후
//위 코드는 "Lucion" 의 저작권에 귀속되기에 무단 배포 , 판매를 금지합니다.
process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled rejection: ${promise} ${reason}`);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.error(`Uncaught exception monitor: ${err} ${origin}`);
});
process.on("uncaughtException", (err, origin) => {
    console.error(`Uncaught exception: ${err} ${origin}`);
})
process.on("rejectionHandled", (promise) => {
    console.error(`Rejection handled: ${promise}`);
});
process.on("warning", (warning) => {
    console.error(`Warning: ${warning}`);
});
process.on("beforeExit", (code) => {
    console.error(`Before exit: ${code}`);
});

const { Client } = require('discord.js')
const config = require('./config');
const fs = require('node:fs')

const client = new Client({ intents: [131071] })
module.exports = client;

client.once('ready', async () => {
    console.log(`bot on ${client.user.tag}`)
})

const eventFiles = fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));
eventFiles.forEach(file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
    } else {
        client.on(event.name, async (...args) => await event.run(...args));
    }
})

client.login(config.token);