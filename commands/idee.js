const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    var suggestie = args.join(" ");

    if (!suggestie) return message.channel.send("Geef een suggestie op");
 
    var ideeEmbed = new discord.RichEmbed()
        .setTitle("Nieuwe suggestie")
        .setColor("#00FF00")
        .addField("Suggestie ", suggestie)
        .addField("Ingezonden door: ", message.author);
 
    var ideeChannel = message.guild.channels.find("name", "bot-suggesties");
    if (!ideeChannel) return message.guild.send("Kan het kanaal niet vinden");
 
    message.delete();

    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
 
    
 
}
 
module.exports.help = {
    name: "suggestie",
    description: "maakt een suggestie voor de bot"
}