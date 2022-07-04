# Handler-basico-Discord.js-v13
## En esta guia te enseño un handler basico para crear tu bot de discord
```js
const Discord = require('discord.js');
const config = require('config.json')
const client = new Discord.Client({
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
    },
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.color = config.color;

function requirehandlers() {
    ["command", "events", ].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client)
        } catch (e) {
            console.warn(e)
        }
    });
}
requirehandlers();

client.login(config.token).catch(() => console.log(`-[X]- THE BOT TOKEN IS MISSING OR EITHER INVALID -[X]-`.red))  

/*
* 🟢 Handler hecho por Mateo#9100
*/
```

### Archivo de config
Crea su archivo config.json, y dentro de ese archivo colocan
```json
{
  "token": "SU_TOKEN_GENERADO",
  "prefix": "!", //puede ser el prefix que quieran
  "ownerIDS": ["/* Tus id */"]
}
```

# Ejemplo de como debe estar organizadas las carpetas, de eventos y comandos. y de como se usa el handler de comandos.
![image](https://i.imgur.com/0rlhS1s.png)

## Ejemplo para usar el handler de eventos.

Evento ready. (va dentro de la carpeta eventos/client)
```js
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
```

Evento messageCreate (va dentro de eventos/guild)
```js
const config = require(`${process.cwd()}/config.json`)
module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefijo.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if (command) {
        if (command.owner) {
            if (!config.ownerIDS.includes(message.author.id)) return message.reply(`❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${config.ownerIDS.map(ownerid => `<@${ownerid}>`)}`)
        }

        if (command.permisos_bot) {
            if (!message.guild.me.permissions.has(command.permisos_bot)) return message.reply(`❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        if (command.permisos) {
            if (!message.member.permissions.has(command.permisos)) return message.reply(`❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        //ejecutar el comando
        command.execute(client, message, args, config.prefijo)
    } else {
        //opcional
        return message.reply("❌ No he encontrado el comando que me has especificado!");
    }
}

/*
* 🟢 Handler hecho por Mateo#9100
*/
```

## Ejemplo para usar el handler en comandos.
```js
module.exports = {
  name: 'comando',
  alias: ["alias1", "alias2"],
  async execute (client, message, args, prefix) => {
    // Código
  }
}
```
## Comando ping.js
```js
const Discord = require("discord.js");

module.exports = {
  name: "ping", //Nombre del comando (debe ser igual al nombre del archivo)
  aliases: [], //Los alias del comando, otra forma de llamarlos por ejemplo para ping <prefix>ping o <prefix>p
  desc: "Sirve para ver el ping del bot", //Descripción del comando
  permisos: ["ADMINISTRATOR"], //Los permisos que necesita el usuario para ejecutar el comando
  permisos_bot: ["ADMINISTRATOR"], //Los permisos que necesita el bot para ejecutar el comadno
  
  async execute (client, message, args, prefix) => { //exportamos el comando
    //y aqui va todo tu codigo
    message.reply({ embeds: [new Discord.MessageEmbed()
      .setDescription(`Mi ping es de: \`${client.ws.ping}\``)
    ]}
  }
}
```

### Dependencias utilizadas:
discord.js, fs.
