const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je hebt geen toestemming om dit command te gebruiken!");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Je gebruikt het command zo: ;tempban @gebruiker tijd en reden of de gebruiker bestaat niet");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kun je niet tempbannen!");

    var tempBanTime = args[1];

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op!");

    if (ms(tempBanTime)) {

        await message.guild.member(user).ban(reason);

        message.channel.send(`${user} is gebanned voor ${reason}`);

        setTimeout(function () {

            message.guild.unban(user.id);

            message.channel.send(`${user} is niet meer gebanned.`);

        }, ms(tempBanTime));

    } else {
        return message.channel.send("Geef een geldige tijd op!");
    }

}

module.exports.help = {
    name: "tempban",
    description: "Hiermee kun je mensen tempbannen. Let op: alleen voor Admins"
}