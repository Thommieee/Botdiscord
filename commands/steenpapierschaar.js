const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!args[0]) return message.channel.send("Gebruik het command op deze manier: ;rps <steen, papier, schaar>");

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0] == "steen") {

        if (result == "papier") {

            message.channel.send(`Ik heb ${result} :notepad_spiral:, ik win.`);

        } else if (result == "schaar") {
            message.channel.send(`Ik heb ${result} :scissors:, jij wint.`);
        } else if (result == "steen") {
            message.channel.send(`Ik heb ${result} :moyai:, gelijkspel.`);
        }

    }
    else if (args[0] == "papier") {

        if (result == "papier") {

            message.channel.send(`Ik heb ${result} :notepad_spiral:, gelijkspel.`);

        } else if (result == "schaar") {
            message.channel.send(`Ik heb ${result} :scissors:, ik win.`);
        } else if (result == "steen") {
            message.channel.send(`Ik heb ${result} :moyai:, jij wint.`);
        }

    }
    else if (args[0] == "schaar") {

        if (result == "papier") {

            message.channel.send(`Ik heb ${result} :notepad_spiral:, jij wint.`);

        } else if (result == "schaar") {
            message.channel.send(`Ik heb ${result} :scissors:, gelijkspel.`);
        } else if (result == "steen") {
            message.channel.send(`Ik heb ${result} :moyai:, ik win.`);
        }

    }
}

module.exports.help = {
    name: "rps",
    description: "Hiermee kun je steen papier schaar spelen"
}