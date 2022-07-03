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
