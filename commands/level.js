const discord = require("discord.js");
const levelFile = require("../data/levels.json");

module.exports.run = async (bot, message, args) => {

    var idUser = message.author.id;

    if (!levelFile[idUser]) {

        levelFile[idUser] = {

            xp: 0,
            level: 0

        }

    }

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;

    if (nextLevelXp === 0) nextLevelXp = 100;

    var whenNextLevel = nextLevelXp - xpUser;

    var embedLevel = new discord.RichEmbed()
        .setTitle(message.author.username)
        .setColor("#ff0000")
        .addField("Level", levelUser, true)
        .addField("xp", xpUser, true)
        .setFooter(`${whenNextLevel} Xp tot volgend level`, message.author.displayAvatarURL);

    message.channel.send(embedLevel);

}

module.exports.help = {
    name: "level",
    description: "Hiermee kun je je level checken"
}