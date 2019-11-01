const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setColor('#0099ff')
			.setDescription("這是" + `${message.author}` + " 的請求，你可以用以下鏈接邀請機械人\n\n\nReiNa Bot\n<https://discordapp.com/api/oauth2/authorize?client_id=418095978273570846&permissions=8&scope=bot>\n\nReiNa-AntiSpam\n<https://discordapp.com/api/oauth2/authorize?client_id=454324523571871754&permissions=8&scope=bot>\n\nReiNa-Cards\n<https://discordapp.com/api/oauth2/authorize?client_id=418363084508495872&permissions=8&scope=bot>\n\nReiNa-Music\n<https://discordapp.com/api/oauth2/authorize?client_id=423846938467762187&permissions=8&scope=bot>\n\nReiNa-WebSocket\n<https://discordapp.com/api/oauth2/authorize?client_id=580129877953609739&permissions=8&scope=bot>\n\nReiNa-LocalMusic\n<https://discordapp.com/api/oauth2/authorize?client_id=440968183277682708&permissions=8&scope=bot>\n\n飆車之鬼\n<https://discordapp.com/api/oauth2/authorize?client_id=601861890036989983&permissions=8&scope=bot>")
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
}

module.exports.help = {
	name: "invite"
}