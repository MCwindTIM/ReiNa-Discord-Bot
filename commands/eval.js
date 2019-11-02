const Discord = require("discord.js");
const util = require('../util.js');
const wincmd = require('node-cmd');
const { inspect } = require('util');
const botconfig = require("../botconfig.json");
module.exports.run = async (bot, message, args) =>{
    message.delete();
    if(message.author.id === botconfig.OwnerID){
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, { depth: 0} ))
        try {

            if(toEval) {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot Eval')
                .setURL("https://mcwind.tk")
                .setDescription(`*處理時間: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*`)
                .addField('輸入', toEval)
                .addField('輸出', `\`\`\`javascript\n${evaluated}\n\`\`\``)
                .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                util.sendDeletableMessage(message.channel, { embed }, message.author);
                return;

            } else {
                const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot 錯誤')
                .setURL("https://mcwind.tk")
                .setDescription("無法執行eval()函式!")
                .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }
        } catch(e) {
            
        }
    }
    else{
        const embed = new Discord.RichEmbed()
                embed
                .setColor('#0099ff')
                .setTitle('ReiNa Bot 錯誤')
                .setURL("https://mcwind.tk")
                .setDescription("權限不足!")
                .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
                    }   catch (err) {
                console.error(err);
                }
    }
}

module.exports.help = {
    name: "eval"
}
