const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');
module.exports.run = async (bot, message, args) =>{
	request.get('https://api.fbi.gov/wanted/v1/list', {},
	function(error, response, fbi){
		if(response.statusCode == 200){
			message.delete();
			var wanted = JSON.parse(fbi);
			var i;
			var r = 0;
				const embed = new Discord.RichEmbed()
				embed
				.setThumbnail("https://www.fbi.gov/++theme++fbigov.theme/images/fbibannerseal.png")
				.setImage(wanted.items[0].images[0].original)
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}, 你要求查詢的資料找到了!`)
				.setColor(0xcc0000)
				.setTitle('FBI 頭10名通緝罪犯')
				.setURL("https://www.fbi.gov/wanted/topten")
				.setTimestamp()
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				
				for (i = 0; i < 10; i++){
					r = r + 1;
					embed.addField("FBI通緝罪犯 [" + r + "]" + " - " + wanted.items[i].title, "性別: " + wanted.items[i].sex + "\n身高: " + wanted.items[i].height_min + " - " + wanted.items[i].height_max + "\n體重: " + wanted.items[i].weight + "\n狀況: " + wanted.items[i].status);
				}
				
				try {
					util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
						console.error(err);
				}
			}
	}
);
}

module.exports.help = {
	name: "fbi"
}