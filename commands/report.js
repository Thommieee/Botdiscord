const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    var prefix = botConfig.prefix;

    if (!args[0]) return message.channel.send(`Gebruik het command als volgt: ${prefix}report @gebruikersnaam reden`);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Geef een gebruiker op of deze gebruiker bestaat niet");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op!");

    var reportEmbed = new discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#ff0000")
        .addField("Reported gebruiker", `${user} met het ID ${user.id}`)
        .addField("Report door", `${message.author} met het ID ${message.author.id}`)
        .addField("Reden", reason)
        .setFooter(message.createdAt);

    var reportChannel = message.guild.channels.find("name", "reports");
    if (!reportChannel) return message.channel.send("Kanaal bestaat niet");

    message.delete();

    return reportChannel.send(reportEmbed);

}

module.exports.help = {
    name: "report",
    description: "Hiermee kun je mensen reporten"
}