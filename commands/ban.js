const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!banUser) return message.channel.send("Gebruiker is niet gevonden");

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij mag dit niet doen!");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan je niet bannen!");

    var ban = new discord.RichEmbed()
        .setDescription("ban")
        .setColor("#ff0000")
        .addField("Banned gebruiker", banUser)
        .addField("Gebanned door", message.author)
        .addField("Reden", reason);

    var banChannel = message.guild.channels.find("name", "botlogs");
    if (!banChannel) return message.channel.send("Kan het loggings kanaal niet vinden!");

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);


    return;

}

module.exports.help = {
    name: "ban",
    description: "Hiermee kun je bannen. Let op: alleen voor Admins"
}