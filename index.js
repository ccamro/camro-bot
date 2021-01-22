const Discord = require('discord.js')

const { prefix, token } = require('./config.json')

const client = new Discord.Client();

client.on('ready', () => {
    console.log('camro bot is online:)');
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}help`)) {
        let embed = new Discord.MessageEmbed()
        .setTitle('Commands')
        .setDescription('Prefix: ` \n ★Ping \n ★Kick \n ★Av \n ★Server \n ★Help')
        .setColor(0xe52f50)
        message.reply(embed)
    }
})

client.on('message', message => {
    if (message.content.startsWith(`${prefix}ping`)) {
        let embed = new Discord.MessageEmbed()
        .setTitle(`
        🏓Pong! \n Latency: ${Date.now() - message.createdTimestamp}ms. \n API Latency is ${Math.round(client.ws.ping)}ms`)
        message.channel.send(embed)
    }
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}av`)) {

        const user = message.mentions.users.first();

        if (user) {
            
            let embed = new Discord.MessageEmbed()
            .setTitle(`${user.tag}'s avatar:`)
            .setImage(user.avatarURL())
            .setColor(0xe52f50)
            message.channel.send(embed)
        } else {
            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.author}'s avatar:`)
            .setImage(message.author.avatarURL())
            .setColor(0xe52f50)
            message.channel.send(embed)
        }
    }
});


client.on('message', message => {
    if (!message.guild) return;

    if (message.content.startsWith(`${prefix}kick`)) {
        const user = message.mentions.users.first();

        if (user) {
            const member = message.guild.member(user);

            if (member) {
                member
                .kick('Reason that will display in audit logs')
                .then(() => {

                    message.reply(`kicked ${user.tag}`);
                })
                .catch(err => {

                    message.reply(`I was unable to kick ${user.tag}`)

                    console.error(err)
                });
            } else {
                message.reply('this user is not in this guild');
            }
        } else {
            message.reply('you did not mention the user to kick:/');
        }
    }
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}server`)) {
        let embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription(`**Server owner:** ${message.guild.owner} \n **Created at:** ${message.guild.createdAt} \n **Member count:** ${message.guild.memberCount}`)
        .setColor(0xe52f50)
        .setImage("https://i.pinimg.com/474x/93/30/e2/9330e2ba8812f086c0b017214b3ead96.jpg")
        message.channel.send(embed);
    }
});



client.login(token);

