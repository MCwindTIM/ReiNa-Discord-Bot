const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setColor('#0099ff')
		.setTimestamp()
		.setDescription("這是" + `${message.author}` + " 的請求，你可以用以下鏈接邀請機械人\n\n\nReiNa Bot\n<https://discordapp.com/api/oauth2/authorize?client_id=418095978273570846&permissions=8&scope=bot>\n\nReiNa-AntiSpam\n<https://discordapp.com/api/oauth2/authorize?client_id=454324523571871754&permissions=8&scope=bot>\n\nReiNa-Cards\n<https://discordapp.com/api/oauth2/authorize?client_id=418363084508495872&permissions=8&scope=bot>\n\nReiNa-Music\n<https://discordapp.com/api/oauth2/authorize?client_id=423846938467762187&permissions=8&scope=bot>\n\nReiNa-WebSocket\n<https://discordapp.com/api/oauth2/authorize?client_id=580129877953609739&permissions=8&scope=bot>\n\nReiNa-LocalMusic\n<https://discordapp.com/api/oauth2/authorize?client_id=440968183277682708&permissions=8&scope=bot>\n\n飆車之鬼\n<https://discordapp.com/api/oauth2/authorize?client_id=601861890036989983&permissions=8&scope=bot>")
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	try {
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
	} catch (err) {
		console.error(err);
	}
}

module.exports.help = {
	name: "invite",
	description: "要求Bot 的邀請連結",
	cate: 4,
	show: true
}