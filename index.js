const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/levels.json");

const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("zijn maker", {type: "LISTENING"})

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Nieuwe Member");

    if (!role) return;

    member.addRole(role);

    const channel = member.guild.channels.find("name", "join");

    if (!channel) return;

    channel.send(`Welkom in onze server ${member}! Geef in dit kanaal de role die je wilt door aan de admins. Als je die role hebt gekregen lees dan eerst #regels en daarna #informatie. Veel plezier in de server!`);

});

bot.on("guildMemberRemove", member => {

    const channel = member.guild.channels.find("name", "botlogs");
    if (!channel) console.log("Kan het kanaal niet vinden.");

    var leaveEmbed = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter("Gebruiker Geleaved.");

    channel.send(leaveEmbed);

});



bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;

    // var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    var randomXp = Math.floor(Math.random(1) * 15) + 1;

    var idUser = message.author.id;

    if (!levelFile[idUser]) {

        levelFile[idUser] = {

            xp: 0,
            level: 0

        }

    }

    levelFile[idUser].xp += randomXp;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;

    if (nextLevelXp === 0) nextLevelXp = 100;

    if (xpUser >= nextLevelXp) {

        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {

            if (err) console.log(err);

        });

        var embedLevel = new discord.RichEmbed()
            .setDescription("***Level hoger***")
            .setColor("#ff0000")
            .addField("Nieuw level: ", levelFile[idUser].level);

        var levelChannel = message.guild.channels.find(c => c.name == "levels-admins");
        if (!levelChannel) return message.guild.send("Kan het level kanaal niet vinden!");

        levelChannel.send(embedLevel);

    }

    if (!commands) {

        var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

        var sentenceUser = "";

        var amountSwearWords = 0;

        var user = message.author


        for (var y = 0; y < messageArray.length; y++) {


            var changeWord = "";


            for (var i = 0; i < swearWords["vloekwoorden"].length; i++) {


                var word = messageArray[y].toLowerCase();

                if (word == swearWords["vloekwoorden"][i]) {


                    changeWord = word.replace(swearWords["vloekwoorden"][i], "^^ ");


                    sentenceUser = sentenceUser + " " + changeWord + "(Wil je niet meer schelden?! Je hebt nu een warn erbij!)";

                    amountSwearWords++;

                }

            }

            if (!changeWord) {


                sentenceUser = sentenceUser + " " + messageArray[y];


            }

        }


        if (amountSwearWords != 0) {

            message.delete();
            message.channel.send(sentenceUser);
            warns[user.id].warns++;

            fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
                if (err) console.log(err)
            });
        }

        if (message.content === "F") message.channel.send("F");

        if (message.content === "E") message.channel.send("E");

        if (message.content === "K") message.channel.send("K");

        if (message.content === "H") message.channel.send("H");

        if (message.content.includes("lmao")) message.channel.send("Stop laughing! You're not funny!");

        if (message.content.includes("nice")) message.channel.send("yer right mate, it is nice");

        if (message.content.includes("noice")) message.channel.send("yer right mate, it is nice");

        if (message.content.includes("depress", "depression", "depressing", "depressed")) message.channel.send("It really do be like that sometimes");

        if (message.content.includes("yeah you", "yeah u")) message.channel.send(message.author + " no you");

        if (message.content.includes("no you", "no u")) message.channel.send("ur face");

        if (message.content.includes("cease")) message.channel.send("Stop! You have violated the law!");

        if (message.content.includes("perhaps")) message.channel.send("perhaps");

        if (message.content.includes("maybe")) message.channel.send("keyword: maybe");

    }

    if (!message.content.startsWith(prefix)) return;

    if (commands) commands.run(bot, message, args);

});

bot.login(process.env.token);