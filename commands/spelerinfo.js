const discord = require("discord.js");
const fs = require("fs");
const levelFile = require("../data/levels.json");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


module.exports.run = async(bot, message, args) => {

    var user = message.mentions.users.first() || message.guild.members.get(args[0]);

    if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server");

    var userJoin = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!userJoin) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server");

    var idUser = user.id;

    var xpUser = levelFile[idUser].xp;



    var userIcon = user.avatarURL;

        var serverEmbed = new discord.RichEmbed()
            .setDescription("Speler info van " + user)
            .setColor("#ff0000")
            .setThumbnail(userIcon)
            .addField("Member is gejoind op", userJoin.joinedAt)
            .addField("Totaal aantal xp", xpUser, true)
            .addField("Totaal aantal warns", warns[user.id].warns);

        return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "spelerinfo",
    description: "Hiermee krijg je info over jezelf of een andere speler. Let op: je moet het zo doen: ;spelerinfo @user"
}