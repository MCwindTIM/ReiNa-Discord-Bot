const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) =>{
    request.get('https://duckduckdoc.tk/redirect-hentai', {},
    function(error, response, body){
        if(response.statusCode == 200){
            message.delete();
            const embed = new Discord.RichEmbed()
                    embed
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor('#0099ff')
                    .setTitle('MCwind 隨機本子API-點擊我下載')
                    .setURL(response.request.uri.href)
                    .setTimestamp()
                    .setDescription(`${message.author}` + ' Senpai, 你要求的隨機本子在這。')
                    .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
    name: "hentai",
    description: "請求一本隨機本子",
    cate: 3,
	show: true
}