const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');
let timer = {};
module.exports.run = async (bot, message, args) =>{
    message.delete();
    let controller = args.slice(0, 1).toString();
        if (controller === "start"){
            timer[message.author.id] = Date.now();
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`${message.author}` + "開始計時。")
            .setColor(0xcc0000)
            .setTitle('ReiNa Bot 計時器')
            .setURL("https://mcwind.tk")
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                await util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }
        else{
            if (controller === "stop"){
                if (timer[message.author.id]) {
                var rightNow = new Date();
                var res = rightNow.toISOString().slice(0,10).replace();
                var hkd2cny = "http://currencies.apps.grandtrunk.net/getrate/" + res + "/HKD/CNY";
                request.get(hkd2cny, {},
                async function(error, response, body){
                    if(response.statusCode == 200){
                        timer[message.author.id] = Date.now() - timer[message.author.id];
                        var HKD = timer[message.author.id] / 1000 * (60 / 3600);
                        var CNY = parseFloat(body)
                        var calc = HKD * CNY / 0.18;
                        var flux = Math.floor(calc);
                        h = Math.floor(timer[message.author.id] / 3600000);
                        if (h < 10) h = "0" + h;
                        timer[message.author.id] = timer[message.author.id] % 3600000;
                        m = Math.floor(timer[message.author.id] / 60000);
                        if (m < 10) m = "0" + m;
                        timer[message.author.id] = timer[message.author.id] % 60000;
                        s = Math.floor(timer[message.author.id] / 1000);
                        if (s < 10) s = "0" + s;
                        timer[message.author.id] = timer[message.author.id] % 1000;
                        if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
                        const embed = new Discord.RichEmbed()
                        embed
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setDescription(`${message.author}` + "計時結束。\n格式:`小時:分鐘:秒`\n\n" + h + ":" + m + ":" + s + "\n\n如果以每小時60HKD薪金計算, 將會是 `" + flux + "` 萬Flux!")
                        .setColor(0xcc0000)
                        .setTitle('ReiNa Bot 計時器')
                        .setURL("https://mcwind.tk")
                        .setTimestamp()
                        .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                        try {
                            await util.sendDeletableMessage(message.channel, { embed }, message.author);
                        }   catch (err) {
                            console.error(err);
                        }
                delete timer[message.author.id];
                return;
                    }
                })
                }
                else{
                    if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
                        const embed = new Discord.RichEmbed()
                        embed
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setDescription(`${message.author}` + "你未開始計時, 請使用`timer`指令加上`start`參數開始計時")
                        .setColor(0xcc0000)
                        .setTitle('ReiNa Bot 計時器')
                        .setURL("https://mcwind.tk")
                        .setTimestamp()
                        .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                        try {
                            await util.sendDeletableMessage(message.channel, { embed }, message.author);
                        }   catch (err) {
                        console.error(err);
                        }
                        return;
                }
            }
            else{
                    const embed = new Discord.RichEmbed()
                    embed
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`${message.author}` + "請在`timer`指令後加入變數 `start` 或者 `stop`")
                    .setColor(0xcc0000)
                    .setTitle('ReiNa Bot 計時器')
                    .setURL("https://mcwind.tk")
                    .setTimestamp()
                    .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                    try {
                        await util.sendDeletableMessage(message.channel, { embed }, message.author);
                    }   catch (err) {
                        console.error(err);
                    }
            }
        }
}

module.exports.help = {
	name: "timer"
}