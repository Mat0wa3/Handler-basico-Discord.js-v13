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
