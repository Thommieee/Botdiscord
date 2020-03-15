const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryId = "668118357836562448";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var bool = false;

    message.guild.channels.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("Je hebt al een ticket aangemaakt!");

            bool = true;

        }

    });

    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Hoi " + message.author.username)
        .setColor("#ff0000")
        .setFooter("Ticket kanaal wordt aangemaakt");

    message.channel.send(embedCreateTicket);

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {

        createdChan.setParent(categoryId).then((settedParent) => {

            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });

            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

            });

            var embedParent = new discord.RichEmbed()
                .setTitle("Hoi " + message.author.username.toString())
                .setColor("#ff0000")
                .setDescription("Zet hier je vraag/bericht");

            settedParent.send(embedParent);

        }).catch(err => {
            message.channel.send("Er is iets fout gegaan.")
        });

    }).catch(err => {
        message.channel.send("Er is iets fout gegaan.")
    });

}

module.exports.help = {
    name: "ticket",
    description: "Hiermee maak je een ticket aan"
}