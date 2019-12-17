const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) =>{
    let port = "";
    if(!args[1]){port = "25565"}
    let mcapi = `http://mcapi.us/server/status?ip=${args[0]}&port=${port}`;
    request.get(mcapi, {},
    function(error, response, body){
        if(error){
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#0099ff')
            .setTitle('MCwind Minecraft API錯誤')
            .setURL(response.request.uri.href)
            .setDescription(`${message.author}` + ' Senpai, 找不到伺服器。')
            .setImage(response.request.uri.href)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
        }
    if(response.statusCode == 200){
        message.delete();
        body = JSON.parse(body);
        let status = "*Minecraft 伺服器沒有回應*"
        if(body.online){
            status = "**Minecraft** 伺服器狀態: **正常**  -  "
            if(body.players.now){
                status += `**${body.players.now}/${body.players.max}**個玩家遊玩中!`
            }
            else{status += `**0/${body.players.max}**個玩家遊玩中!`}
            if(body.motd){status += `\n伺服器motd: ${body.motd}`}
        }
        const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('Minecraft API')
                .setURL(response.request.uri.href)
                .setDescription(`${message.author}, ${args[0]}:${port}的Minecraft伺服器狀態如下\n\n${status}`)
                .setTimestamp()
                .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
                }   catch (err) {
                    console.error(err);
                }
    }
    })
}

module.exports.help = {
	name: "mc"
}