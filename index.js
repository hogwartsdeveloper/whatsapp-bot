const fs = require('fs');
const qrCode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');


const client = new Client({
    authStrategy: new LocalAuth({clientId: 'rt-id'})
});

client.on('qr', (qr) => {
    qrCode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize().then();

const price = MessageMedia.fromFilePath('./img/rt-prices.jpeg');

client.on('message', (message) => {
    // console.log(message);
    if (message.body === 'Salam') {

        message.reply(price).then();
    }
});

client.on('authenticated', (session) => {
    console.log('Client authenticated');
})