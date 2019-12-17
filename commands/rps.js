const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
    message.delete();
    let 剪刀 = "<:xscissors:647687182538113034>";
    let 石頭 = "<:xrock:647687152003579944>";
    let 布 = "<:xpaper:647687122727338015>";

    let userChoice;
    if(message.content.startsWith(剪刀)){userChoice = 剪刀}
    if(message.content.startsWith(石頭)){userChoice = 石頭}
    if(message.content.startsWith(布)){userChoice = 布}

    let cpuChoice = choice();

    if(userChoice === cpuChoice){
        const embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(0xffff00)
        .setTitle('剪刀石頭布')
        .setDescription(`${message.author}` + ' Senpai, 是平手呢~')
        .addField(`${message.author.tag}`, `${userChoice}`)
        .addField(`${bot.user.tag}`, `${userChoice}`)
        .setTimestamp()
        .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        try {
            util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (err) {
            console.error(err);
        }
        return;
    }

    if(userChoice === 剪刀){
        if(cpuChoice === 石頭){
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0xffff00)
            .setTitle('剪刀石頭布')
            .setDescription(`${message.author}` + ' Senpai, 是我贏了~')
            .addField(`${message.author.tag}`, `${userChoice}`)
            .addField(`${bot.user.tag}`, `${石頭}`)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }else{
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0xffff00)
            .setTitle('剪刀石頭布')
            .setDescription(`${message.author}` + ' Senpai, 是我輸了~')
            .addField(`${message.author.tag}`, `${userChoice}`)
            .addField(`${bot.user.tag}`, `${布}`)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }
    }

    if(userChoice === 石頭){
        if(cpuChoice === 布){
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0xffff00)
            .setTitle('剪刀石頭布')
            .setDescription(`${message.author}` + ' Senpai, 是我贏了~')
            .addField(`${message.author.tag}`, `${userChoice}`)
            .addField(`${bot.user.tag}`, `${布}`)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }else{
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0xffff00)
            .setTitle('剪刀石頭布')
            .setDescription(`${message.author}` + ' Senpai, 是我輸了~')
            .addField(`${message.author.tag}`, `${userChoice}`)
            .addField(`${bot.user.tag}`, `${剪刀}`)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }
    }

    if(userChoice === 布){
        if(cpuChoice === 剪刀){
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0xffff00)
            .setTitle('剪刀石頭布')
            .setDescription(`${message.author}` + ' Senpai, 是我贏了~')
            .addField(`${message.author.tag}`, `${userChoice}`)
            .addField(`${bot.user.tag}`, `${剪刀}`)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }else{
            const embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(0xffff00)
            .setTitle('剪刀石頭布')
            .setDescription(`${message.author}` + ' Senpai, 是我輸了~')
            .addField(`${message.author.tag}`, `${userChoice}`)
            .addField(`${bot.user.tag}`, `${石頭}`)
            .setTimestamp()
            .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
                util.sendDeletableMessage(message.channel, { embed }, message.author);
            }   catch (err) {
                console.error(err);
            }
            return;
        }
    }

}

function choice(){
    let 剪刀 = "<:xscissors:647687182538113034>";
    let 石頭 = "<:xrock:647687152003579944>";
    let 布 = "<:xpaper:647687122727338015>";
    let randomNumber = Math.floor(Math.random() * 3);
    switch(randomNumber){
        case 0:
            return 布;
        case 1:
            return 石頭;
        case 2:
            return 剪刀;
    }
}  

module.exports.help = {
	name: "rps¿"
}