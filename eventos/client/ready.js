const Discord = require("discord.js");
const config = require('../../config.json');
module.exports = client => {

    console.log(` CONECTADO COMO: ${client.user.tag} `)
    const estados = [
        {
            name: `Bot desarrollado por: \`Mateo#9100\``,
            type: 'PLAYING',
        },
        {
            name: `${config.prefix}help | Estoy en ${client.guilds.cache.size} servidores, genial no?.`,
            type: 'WATCHING',
        },
    ]
    const aleatorio = estados[Math.floor(Math.random() * estados.length)]
    setInterval(() => {
        function Presence() {
            client.user.setPresence({
                activities: [aleatorio],
                status: 'idle'
            })
        }
        Presence()
    }, 1000)
    console.table({ 
        'Usuario:' : `${client.user.tag}` ,
        'Servidor(es):' : `${client.guilds.cache.size} Servidores` ,
        'Viendo:' : `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Miembros` ,
        'Prefix:' : `${config.prefix}` ,
        'Comandos:' : `${client.commands.size}` ,
        'Discord.js:' : `v${Discord.version}` ,
        'Node.js:' : `${process.version}` ,
        'Plataforma:' : `${process.platform} ${process.arch}` ,
        'Memoria:' : `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
      });
}

/*
* 🟢 Handler hecho por Mateo#9100
*/
