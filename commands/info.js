const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setDescription("Bot info")
        .setColor("#ff0000")
        .setThumbnail(botIcon)
        .addField("Bot name", bot.user.username)
        .addField("Gemaakt op", bot.user.createdAt);

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info",
    description: "Hiermee krijg je info over de bot."
}