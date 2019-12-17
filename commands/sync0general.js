const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
if(message.attachments.size > 0){
	let i;
	for (i=0;i<message.attachments.size;i++){
		if(message.attachments.every(attachIsImage)){
			await bot.channels.get("398062441948512257").send(`${message.author.tag}:\n${message.attachments.array()[i].url}`);
		}
	}
}
if(!message.content){}else{bot.channels.get("398062441948512257").send(`${message.author.tag}:\n${message.content}`);}

}


module.exports.help = {
	name: "sync¿0generalchannel"
}

function attachIsImage(msgAttach){
	let url = msgAttach.url;
	if(url.indexOf("png", url.length - "png".length) !== -1){return true}
	if(url.indexOf("jpg", url.length - "jpg".length) !== -1){return true}
	if(url.indexOf("gif", url.length - "gif".length) !== -1){return true}
	if(url.indexOf("jpeg", url.length - "jpeg".length) !== -1){return true}
	return false
}