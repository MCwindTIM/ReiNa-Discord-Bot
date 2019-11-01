const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) =>{
    request.get('https://duckduckdoc.tk/redirect-glasses', {},
    function(error, response, body){
    if(response.statusCode == 200){
        message.delete();
        const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('MCwind 眼鏡娘API')
                .setURL(response.request.uri.href)
                .setDescription(`${message.author}` + ' Senpai, 你要求的眼鏡娘在這。')
                .setImage(response.request.uri.href)
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
	name: "img-glasses"
}