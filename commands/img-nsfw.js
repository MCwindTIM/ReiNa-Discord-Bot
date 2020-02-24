const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) =>{
    request.get('https://duckduckdoc.tk/redirect-all', {},
    function(error, response, body){
    if(response.statusCode == 200){
        message.delete();
        const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('MCwind 隨機圖片API [NSFW]')
                .setTimestamp()
                .setURL(response.request.uri.href)
                .setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
                .setImage(response.request.uri.href)
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
                }   catch (err) {
                    console.error(err);
                }
    }
    })
}

module.exports.help = {
    name: "img-nsfw",
    description: "請求一張隨機圖片 【不適合在工作/公開場所使用】",
    cate: 3,
	show: true
}