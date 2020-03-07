const Discord = require("discord.js");
const util = require('../util.js');
const { inspect } = require('util');
const botconfig = require("../botconfig.json");
const hastebin = require("hastebin-gen");
module.exports.run = async (bot, message, args) =>{
    message.delete();
    if(message.author.id === botconfig.OwnerID){
        try {
            let toEval = args.join(" ");
            let evaluated = inspect(eval(toEval, { depth: 0} ))

            if(!toEval) {
                const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot 錯誤')
                .setURL("https://mcwind.tk")
                .setTimestamp()
                .setDescription("請輸入參數!")
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
                return util.sendDeletableMessage(message.channel, { embed }, message.author);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot Eval')
                .setURL("https://mcwind.tk")
                .setTimestamp()
                .setDescription(`*處理時間: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*`)
                .addField('輸入', `\`\`\`js\n${toEval}\n\`\`\``)
                .addField('輸出', `\`\`\`javascript\n${evaluated}\n\`\`\``)
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
                return util.sendDeletableMessage(message.channel, { embed }, message.author);
            }
        } catch(e) {
            if(e.message.length <= 2000){
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#0099ff')
            .setTitle('ReiNa Bot 錯誤')
            .setURL("https://mcwind.tk")
            .setTimestamp()
            .setDescription(`${message.author} 哎呀, 出錯啦!`)
            .addField("eval 錯誤", `${e.message}`)
            .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
            return util.sendDeletableMessage(message.channel, { embed }, message.author);
            }else{
                hastebin(e.message, { extension: "txt" }).then(haste => {
                    const embed = new Discord.RichEmbed()
                    embed
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor('#0099ff')
                    .setTitle('ReiNa Bot eval 錯誤')
                    .setURL("https://mcwind.tk")
                    .setTimestamp()
                    .setDescription(`Error 信息長度超過2000字元, 請到 ${haste} 查看錯誤信息`)
                    .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);    
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
                }).catch(error => {
                });
                return;
            }
        }
    }
    else{
        const embed = new Discord.RichEmbed()
                embed
                .setColor('#0099ff')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle('ReiNa Bot 錯誤')
                .setURL("https://mcwind.tk")
                .setTimestamp()
                .setDescription("權限不足!")
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
                    }   catch (err) {
                        console.log(`${message.author.tag} is trying to use eval command without permission!`);
                    }
    }
}

module.exports.help = {
    name: "eval",
    description: "即時進行程式編寫並執行",
    cate: 2,
	show: true
}
