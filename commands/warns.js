const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Je hebt geen toestemming om dit command te gebruiken!");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, deze persoon kun je niet warnen!");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden!");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("warn")
        .setColor("#ff0000")
        .addField("warned gebruiker", user)
        .addField("Gewarned door", message.author)
        .addField("Aantal warns", warns[user.id].warns)
        .addField("Reden", reason);

    var warnChannel = message.guild.channels.find("name", "botlogs"); 
    if (!warnChannel) return message.channel.send("Kan het loggings kanaal niet vinden!");

    warnChannel.send(warnEmbed);

    var muteRole = message.guild.roles.find("name", "Muted");

    if (!muteRole) return message.channel.send("De role Muted bestaat niet!");

    var kickReason = "Je hebt teveel warns";

    var banReason = "Je hebt teveel warns";

    if (warns[user.id].warns == 4) {

        var mutebericht = new discord.RichEmbed()
            .setDescription("PAS OP" + user)
            .setColor("#ff0000")
            .addField("Bericht", "Nog 1 warn en je krijgt een mute!");

        message.channel.send(mutebericht);


    } else if (warns[user.id].warns == 5) {

        await (user.addRole(muteRole.id))
        message.channel.send(`${user} is gemuted!`);
    }


    if (warns[user.id].warns == 9) {

        var kickbericht = new discord.RichEmbed()
            .setDescription("PAS OP" + user)
            .setColor("#ff0000")
            .addField("Bericht", "Nog 1 warn en je krijgt een kick!");

        message.channel.send(kickbericht);


    } else if (warns[user.id].warns == 10) {

        message.guild.member(user).kick(kickReason);
        message.channel.send(`${user} is gekickt!`);
    }


    if (warns[user.id].warns == 14) {

        var banbericht = new discord.RichEmbed()
            .setDescription("PAS OP" + user)
            .setColor("#ff0000")
            .addField("Bericht", "Nog 1 warn en je krijgt een ban!");

        message.channel.send(banbericht);


    } else if (warns[user.id].warns == 15) {

        message.guild.member(user).ban(banReason);
        message.channel.send(`${user} is verbannen!`);
    }

}

module.exports.help = {
    name: "warn",
    description: "Hiermee kun je iemand warnen. Let op: alleen voor Admins"
}