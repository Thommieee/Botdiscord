const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryId = "668118357836562448";

    if (message.channel.parentID == categoryId) {

        message.channel.delete();

    } else {

        message.channel.send("Gebruik dit commando alleen in een ticket kanaal.");

    }

    var embedCloseTicket = new discord.RichEmbed()
        .setTitle("Hoi " + message.channel.name)
        .setColor("#ff0000")
        .setDescription("Het ticket is gemarkeerd als **compleet**.")
        .setFooter("Ticket gesloten");

    var logChannel = message.guild.channels.find("name", "logging-tickets");
    if (!logChannel) return message.channel.send("Kanaal bestaat niet");

    logChannel.send(embedCloseTicket);

}

module.exports.help = {
    name: "close",
    description: "Hiermee sluit je een ticket. Let op: alleen voor Admins"
}