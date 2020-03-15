const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Je hebt geen toestemming om dit command te gebruiken!");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, deze persoon kun je niet muten!");

    var muteRole = message.guild.roles.find("name", "Muted");

    if (!muteRole) return message.channel.send("De role Muted bestaat niet!");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("Je moet wel een mute tijd opgeven!");

    await (user.addRole(muteRole.id))

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} is geunmuted`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "mute",
    description: "Hiermee kun je muten. Let op: alleen voor Admins"
}