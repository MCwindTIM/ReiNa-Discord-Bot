const Discord = require("discord.js");
const util = require('../util.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports.run = async (bot, message, args) =>{
	let messageArray = message.content.split(" ");
	if(messageArray.length === 3){
		message.delete();
	request.get('https://api.nasa.gov/planetary/earth/imagery/?lat=' + messageArray[1] + "&lon=" + messageArray[2] + "&cloud_score=True&dim=0.05&api_key=" + botconfig.nasaAPI, {},
	function(error, response, raw){
		var obj = JSON.parse(raw);
		const embed = new Discord.RichEmbed()
		embed
		.setThumbnail("https://duckduckdoc.tk/wp-content/uploads/drive/nasa.png")
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setDescription(`${message.author}, 你要求查詢的資料找到了!`)
		.addField("位置 [Latitude] [Longitude]", "|" + messageArray[1] + "| |" + messageArray[2] + "|")
		.setColor(0xcc0000)
		.setTitle('NASA API')
		.setImage(obj.url)
		.setURL(obj.url)
		.setTimestamp()
		.addField("衛星圖像拍攝時間", obj.date)
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		try {
			util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
				console.error(err);
		}
	});
	}
	else{
		message.delete();
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}, 請正確使用rn!where [Latitude] [Longitude]`)
			.setColor(0xcc0000)
			.setTitle("ReiNa Bot 錯誤")
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
					console.error(err);
			}
	}
}

module.exports.help = {
	name: "where",
	description: "以經緯度尋找衛星圖像",
	cate: 7,
	show: true
}