const qrCode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const client = new Client({
    authStrategy: new LocalAuth({clientId: 'rt-id'}),
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
    // console.log(message);
    if (message.body === 'Salam') {
    }
});

client.on('authenticated', (session) => {
    console.log('Client authenticated');
})