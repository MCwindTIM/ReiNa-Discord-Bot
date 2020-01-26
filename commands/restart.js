const Discord = require("discord.js");
const util = require('../util.js');
const wincmd = require('node-cmd');
const botconfig = require("../botconfig.json");
module.exports.run = async (bot, message, args) =>{
    if(message.author.id === botconfig.OwnerID){
        message.delete();
        const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot')
                .setURL("https://mcwind.tk")
                .setDescription("重新啟動中...:wave:")
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author)
                    .then(msg => bot.destroy())
                    .then(console.log("提示:重新啟動"))
                    .then(
                    wincmd.run('start restart.bat')
                    );
                }   catch (err) {
                    console.error(err);
                }
    }
    else{
        message.delete();
        const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                .setTitle('ReiNa Bot 錯誤')
                .setURL("https://mcwind.tk")
                .setDescription("權限不足!")
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
                    }   catch (err) {
                console.error(err);
                }
    }
}

module.exports.help = {
    name: "restart",
    description: "重新啟動bot", 
    cate: 6,
	show: true
}