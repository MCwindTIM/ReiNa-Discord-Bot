const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) => {
    request.get('https://api.n-cov.info/figure', {},
        function (error, response, raw) {
            message.delete();
            var obj = JSON.parse(raw);
            var latestobj = obj.data[obj.data.length - 1];
            const embed = new Discord.RichEmbed()
            embed
                .setThumbnail("https://upload.wikimedia.org/wikipedia/zh/thumb/b/ba/Logo_of_Department_of_Health%2C_Hong_Kong.svg/150px-Logo_of_Department_of_Health%2C_Hong_Kong.svg.png")
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription(`${message.author}, 你要求查詢的資料找到了!`)
                .setColor(0xcc0000)
                .setTitle('香港政府最新公佈武漢肺炎資訊')
                .setURL("https://www.dh.gov.hk/cindex.html")
                .addField(`資料更新日期`, `${latestobj.updateDate} ${latestobj.updateTime} (24小時制)`)
                .addField(`確診數目`, `${latestobj.comfirmCase} 人`)
                .addField(`懷疑感染武漢肺炎數目`, `${latestobj.fulfillReportingCriteria} 人`)
                .addField(`排除感染武漢肺炎數目`, `${latestobj.ruleOut} 人`)
                .addField(`調查中...`, `${latestobj.investigation} 人`)
                .addField(`死亡人數`, `${latestobj.death} 人`)
                .addField(`康復人數`, `${latestobj.recover} 人`)
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
            try {
                util.sendDeletableMessage(message.channel, {
                    embed
                }, message.author);
            } catch (err) {
                console.error(err);
            }

        });
}

module.exports.help = {
    name: "武漢肺炎",
    description: "香港政府最新公佈的武漢肺炎資訊",
    cate: 8,
    show: true
}