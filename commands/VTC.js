const Discord = require("discord.js");
const util = require('../util.js');
const superagent = require('superagent');
const cheerio = require('cheerio');
module.exports.run = async (bot, message, args) => {
    let dataArray = [];
    message.delete();
    dataArray = getData("https://myportal.vtc.edu.hk/wps/portal/", dataArray, message, bot);
}

module.exports.help = {
    name: "vtc",
    description: "獲取VTC news 資訊",
    cate: 8,
    show: true

}

function getData(url, dataArray, message, bot) {
    superagent.get(url).set('Accept-Language', 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,zh-CN;q=0.5,und;q=0.4').end((err, res) => {
        if (err) {
            console.log(`Error: ${err}`);
            const embed = new Discord.RichEmbed()
            embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot')
                .setURL("https://mcwind.tk")
                .setDescription(`${message.author}, senpai~ 發生錯誤 請稍後再試!`)
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
            try {
                util.sendDeletableMessage(message.channel, {
                    embed
                }, message.author);
            } catch (err) {
                console.error(err);
            }
        } else {
            let $ = cheerio.load(res.text);
            let i;
            $('p').attr('dir', 'ltr').each((idx, ele) => {
                if ($(ele).text().match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/)) {
                    dataArray.push($(ele).text());
                }
            })
            const embed = new Discord.RichEmbed()
            embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot')
                .setURL("https://mcwind.tk")
                .setDescription(`${message.author}, senpai~ 已經獲取到VTC 最新的消息了`)
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
            for (let i = 0; i < dataArray.length; i++) {
                embed.addField(`消息 ${i + 1}`, `${dataArray[i]}`);
            }
            try {
                util.sendDeletableMessage(message.channel, {
                    embed
                }, message.author);
            } catch (err) {
                console.error(err);
            }
        }
    });

}
