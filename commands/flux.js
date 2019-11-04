const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) =>{
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0,10).replace();
    var hkd2cny = "http://currencies.apps.grandtrunk.net/getrate/" + res + "/HKD/CNY";
    request.get(hkd2cny, {},
    function(error, response, body){
        if(response.statusCode == 200){
        message.delete();
        var mString = args.join(" ");
        var HKD = parseFloat(mString);
        var CNY = parseFloat(body)
        var calc = HKD * CNY / 0.23;
        var flux = Math.floor(calc);
        const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle("ReiNa Bot 點我購買Trove Flux")
                .setTimestamp()
                .setURL("https://item.taobao.com/item.htm?spm=a1z09.2.0.0.6ce02e8dGSuOvJ&id=548238250656&_u=625udhqs9009")
                .setDescription(`${message.author}` + " \nSenpai, 你可以使用 `" + HKD + "` HKD購買到大約 `" + flux + "` 萬flux! (向下取整)\n今天港幣兌換人民幣匯率是: `" + body + "`\n購買數量請填入: `" + HKD * CNY + "`")
                .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
                }   catch (err) {
                console.error(err);
                }
        }
        return;
    })
}

module.exports.help = {
	name: "flux"
}