const Discord = require("discord.js");
const util = require('../util.js');
let downtimer = {};
let pattern = {'Mon':'(一)','Tue':'(二)','Wed':'(三)','Thu':'(四)','Fri':'(五)','Sat':'(六)','Sun':'(日)','Jan':'一月','Feb':'二月','Mar':'三月', 'Apr':'四月', 'May':'五月', 'Jun':'六月', 'Jul':'七月', 'Aug':'八月', 'Sep':'九月', 'Oct':'十月', 'Nov':'十一月', 'Dec':'十二月', '(China Standard Time)': ''};
module.exports.run = async (bot, message, args) =>{
    try{
    eT = new Date().toString();
    let CST = eT.replace(/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?|\(China Standard Time\))/g, m => pattern[m]);
    message.delete();
    if(args[0] > 0){
    if(!isNaN(args[0])){
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${message.author}` + "開始倒數計時。**" + args[0] + '**秒')
        .setColor(0xcc0000)
        .setTitle('ReiNa Bot 倒數計時器')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
        try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (e) {}
        downtimer[message.channel.id+message.author.id] = args[0];
        startCountdown(message, downtimer[message.channel.id+message.author.id], CST, bot);
    }else{
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${message.author}` + "請輸入有效數值: `秒`\n" + "你輸入的值: **" + args[0] + "**")
        .setColor(0xcc0000)
        .setTitle('ReiNa Bot 倒數計時器')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
        try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (e) {}
    }
    }else{
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${message.author}` + "請輸入有效數值: `秒`\n" + "你輸入的值: **" + args[0] + "**")
        .setColor(0xcc0000)
        .setTitle('ReiNa Bot 倒數計時器')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
        try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (e) {}
    }
}catch(e){}

}

module.exports.help = {
    name: "downtimer",
    description: "鬧鐘, 單位以秒計算",
    cate: 2,
	show: true
}

function startCountdown(message, seconds, CST, bot){
    var counter = seconds;
  
    var interval = setInterval(() => {
      counter--;
      
  
      if(counter < 0 ){
        clearInterval(interval);
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${message.author}` + `你設置的鬧鐘響了~ 你是不是泡好泡麵了?`)
        .addField('設置時間', `${CST}`)
        .addField('時長', `${seconds}秒`)
        .setColor(0xcc0000)
        .setTitle('ReiNa Bot 倒數計時器')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
        try {
            util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (e) {}
      };
    }, 1000);
  };