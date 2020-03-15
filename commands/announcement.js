const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Je hebt geen toegang om dit command te gebruiken!");

    var splitser = "//";

    if (args[0] == null) {

        var useMesagge = new discord.RichEmbed()
            .setTitle("Gebruik")
            .setColor("#ff0000")
            .setDescription(`Maak een announcement door gebruik te maken van: \n ;announcement Titel ${splitser} Bericht ${splitser} Kleur (Dit doe je door op google te zoeken naar Color Picker en dan de #code hierin te zetten) ${splitser} Kanaal`);

        return message.channel.send(useMesagge);

    }

    args = args.join(" ").split(splitser);

    if (args[2] == undefined) args[2] = "#000000";
    if (args[3] == undefined) args[3] = "club-mascot-test-channel";

    var options = {

        titel: args[0] || "Melding",
        bericht: args[1] || "Geen inhoud opgegeven",
        kleur: args[2].trim(),
        kanaal: args[3].trim()

    }

    var announcement = message.author;

    var announcementEmbed = new discord.RichEmbed()
        .setTitle("Announcement")
        .setColor(options.kleur)
        .setDescription(`Bericht van ${announcement} \n\n ${options.titel} \n\n ${options.bericht} \n`)
        .setTimestamp();

    var announcementChannel = message.guild.channels.find(`name`, options.kanaal);
    if (!announcementChannel) return message.channel.send("Kan het kanaal niet vinden!");

    announcementChannel.send(announcementEmbed);

}

module.exports.help = {
    name: "announcement",
    description: "Hiermee kun je een announcement doen. Let op: alleen voor Admins"
}