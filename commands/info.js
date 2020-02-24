const Discord = require("discord.js");
const util = require('../util.js');
const os = require('os');
module.exports.run = async (bot, message, args) =>{
    let cpuinfo = os.cpus();
    let oss = os.uptime();
    oss = Math.floor(oss);
    let osdays = Math.floor(oss / 86400);
    oss %= 86400;
    let oshours = Math.floor(oss / 3600);
    oss %= 3600;
    let osmins = Math.floor(oss / 60);
    oss %= 60;
    const pattern = {'Mon':'(一)','Tue':'(二)','Wed':'(三)','Thu':'(四)','Fri':'(五)','Sat':'(六)','Sun':'(日)','Jan':'一月','Feb':'二月','Mar':'三月', 'Apr':'四月', 'May':'五月', 'Jun':'六月', 'Jul':'七月', 'Aug':'八月', 'Sep':'九月', 'Oct':'十月', 'Nov':'十一月', 'Dec':'十二月', '(China Standard Time)': ''};
    message.delete(); 
    const _guptime = global.uptime.replace(/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?|\(China Standard Time\))/g, m => pattern[m]);
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
    let osuptime = `${osdays} 天, ${oshours} 小時, ${osmins} 分鐘, ${oss} 秒`
    let time = `${new Date().getTime() - message.createdTimestamp}ms`;
    const embed = new Discord.RichEmbed()
    embed
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`${message.author} senpai, 我花了**${time}** 才收到你的信息並回覆\n`)
    .setColor(0xcc0000)
    .addField('系統內容', `**${os.type()} | ${os.release()} | ${os.platform()}**`)
    .addField('系統CPU型號', `**${cpuinfo[0].model}**`)
    .addField('系統CPU現時速度', `**${cpuinfo[0].speed / 1000}GHz**`)
    .addField('系統記憶體用量', `**${os.totalmem() - os.freemem()} / ${os.totalmem()} Byte | ${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB**`)
    .addField('系統運作時間', `**${osuptime}**`)
    .addField('程序開始運作時間', `**${_guptime}**`)
    .addField('Bot上線運行時間', `**${uptime}**`)
    .addField('服務數量', `**${bot.guilds.size}**個伺服器, **${bot.channels.size}**個頻道, **${bot.users.size}**個用戶!`)
    .addField('我與DiscordAPI的網絡時延', `**${Math.floor(bot.ping)}**ms`)
    .setTitle('ReiNa Bot')
    .setURL("https://mcwind.tk")
    .setTimestamp()
    .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
    try {
        await util.sendDeletableMessage(message.channel, { embed }, message.author);
    }   catch (err) {
        console.error(err);
    }
}

module.exports.help = {
    name: "info",
    description: "查看bot的資訊",
    cate: 3,
	show: true
}