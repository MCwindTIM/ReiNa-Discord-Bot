const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	const embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setImage("https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/8438467/ab75a6851edf3fceb0a62b843d28815f77bb10ed.gif")
	.setDescription(`${message.author}, Here we go!`)
	.setColor(0xcc0000)
	.setTitle("ReiNa Bot")
	.setURL("https://mcwind.tk")
	.setTimestamp()
	.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	try {
		util.sendDeletableMessage(message.channel, { embed }, message.author);
	}   catch (err) {
			console.error(err);
	}
}

module.exports.help = {
	name: "touhou"
}