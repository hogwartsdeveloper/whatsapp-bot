const qrCode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { getHelloMsg } = require("./src/message");

const contactMap = new Map();

const client = new Client({
    authStrategy: new LocalAuth({clientId: 'test'}),
    puppeteer: {
        executablePath: process.env.CHROMIUM_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrCode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize().then();


client.on('message', (message) => {
    if (contactMap.has(message?.from)) {
        if (new Date().getTime() > contactMap.get(message?.from)) {
            contactMap.delete(message?.from);
            getHelloMsg(client, message?.from)
        }
    } else {
        contactMap.set(message?.from, new Date().getTime() + 60000 * 60 * 24);
        getHelloMsg(client, message?.from);
    }
});

client.on('authenticated', () => {
    console.log('Client authenticated');
})