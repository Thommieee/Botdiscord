const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!args[0]) return message.channel.send("Gebruik het command op deze manier: ;random <twee getallen. Keuze uit: 1-10, 1-20>");

    var options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0] == "1-10") {

        if (result == "1") {

            message.channel.send(result);

        } else if (result == "2") {
            message.channel.send(result);
        } else if (result == "3") {
            message.channel.send(result);
        } else if (result == "4") {
            message.channel.send(result);
        } else if (result == "5") {
            message.channel.send(result);
        } else if (result == "6") {
            message.channel.send(result);
        } else if (result == "7") {
            message.channel.send(result);
        } else if (result == "8") {
            message.channel.send(result);
        } else if (result == "9") {
            message.channel.send(result);
        } else if (result == "10") {
            message.channel.send(result);
        }

    }
    else if (args[0] == "1-20") {

        if (result == "1") {

            message.channel.send(result);

        } else if (result == "2") {
            message.channel.send(result);
        } else if (result == "3") {
            message.channel.send(result);
        } else if (result == "4") {
            message.channel.send(result);
        } else if (result == "5") {
            message.channel.send(result);
        } else if (result == "6") {
            message.channel.send(result);
        } else if (result == "7") {
            message.channel.send(result);
        } else if (result == "8") {
            message.channel.send(result);
        } else if (result == "9") {
            message.channel.send(result);
        } else if (result == "10") {
            message.channel.send(result);
        } else if (result == "11") {
            message.channel.send(result);
        } else if (result == "12") {
            message.channel.send(result);
        } else if (result == "13") {
            message.channel.send(result);
        } else if (result == "14") {
            message.channel.send(result);
        } else if (result == "15") {
            message.channel.send(result);
        } else if (result == "16") {
            message.channel.send(result);
        } else if (result == "17") {
            message.channel.send(result);
        } else if (result == "18") {
            message.channel.send(result);
        } else if (result == "19") {
            message.channel.send(result);
        } else if (result == "20") {
            message.channel.send(result);
        }

    }

}

module.exports.help = {
    name: "random",
    description: "Hiermee krijg je een random getal terug"
}