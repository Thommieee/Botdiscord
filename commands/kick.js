const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!kickUser) return message.channel.send("Gebruiker is niet gevonden");

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij mag dit niet doen!");

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan je niet kicken!");

    var kick = new discord.RichEmbed()
        .setDescription("kick")
        .setColor("#ff0000")
        .addField("Kicked gebruiker", kickUser)
        .addField("Gekicked door", message.author)
        .addField("Reden", reason);

    var kickChannel = message.guild.channels.find('name', "botlogs");
    if (!kickChannel) return message.channel.send("Kan het loggings kanaal niet vinden!");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    return;

}

module.exports.help = {
    name: "kick",
    description: "Hiermee kun je kicken. Let op: alleen voor Admins"
}