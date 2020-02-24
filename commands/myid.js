const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
    message.delete(); 
    const embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${message.author}, senpai! 你的Discord使用者ID是: ${message.author.id}`)
        .setColor(0xcc0000)
        .setTitle('ReiNa Bot')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
        try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (err) {
            console.error(err);
        }
}

module.exports.help = {
    name: "myid",
    description: "請求自己的ID",
    cate: 5,
	show: true
}