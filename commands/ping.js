const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
    message.delete(); 
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
    let seconds = Math.floor(totalSeconds % 60);
    totalSeconds %= 60;
    let uptime = `${days} 天, ${hours} 小時, ${minutes} 分鐘, ${seconds} 秒`;
    let time = `${new Date().getTime() - message.createdTimestamp}ms`;
    const embed = new Discord.RichEmbed()
    embed
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`${message.author} senpai, 我花了${time} 才收到你的信息\n\n我與DiscordAPI的網絡時延是: ${Math.floor(bot.ping)}ms\n\n我已經上線運行了: ${uptime}`)
    .setColor(0xcc0000)
    .setTitle('ReiNa Bot')
    .setURL("https://mcwind.tk")
    .setTimestamp()
    .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
    try {
        await util.sendDeletableMessage(message.channel, { embed }, message.author);
    }   catch (err) {
        console.error(err);
    }
}

module.exports.help = {
	name: "ping"
}