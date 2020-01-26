const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/feizhou.jpg")
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
}

module.exports.help = {
	name: "非洲",
	description: "發送圖片表示你的心情",
	cate: 8,
	show: true
}