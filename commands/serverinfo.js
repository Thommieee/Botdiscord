const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var icon = message.guild.iconURL;

    var server = message.guild.name;

        var serverEmbed = new discord.RichEmbed()
            .setDescription(`Server info van ${server}`)
            .setColor("#ff0000")
            .setThumbnail(icon)
            .addField("Bot name", bot.user.username)
            .addField("Je bent gejoind op", message.member.joinedAt)
            .addField("Totaal aantal members", message.guild.memberCount);

        return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo",
    description: "Hiermee krijg je info over de server"
}