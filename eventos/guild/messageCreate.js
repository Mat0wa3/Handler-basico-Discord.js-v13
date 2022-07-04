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
