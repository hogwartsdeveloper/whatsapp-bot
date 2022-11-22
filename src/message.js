function getHelloMsg(client, from) {
    client
        .sendMessage(from,'Добрый день! Можете посмотреть наш каталог и узнать цены инструментов. ' +
            'https://rental-tools.netlify.app')
        .then()
}

module.exports = { getHelloMsg }