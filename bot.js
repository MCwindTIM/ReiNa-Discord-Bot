const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
var request = require ("request");

bot.login(botconfig.token);

bot.on("ready", async () => {
  console.log(`${bot.user.username} 上線!`);
  	bot.user.setPresence({ game: { name: '測試! | ReiNa Is Here! Nya~~~~' , type: 3 } });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}img`){
	message.channel.send("測試! " + `${message.author}` + " senpai, 你要求的圖片在這。");
	message.channel.send({
		files: ['https://duckduckdoc.tk/wp-content/uploads/drive/userpopup.gif']
	})
    return;
  }

  if(cmd === `${prefix}help`){
	  //例如在這裡加message.delete().catch(O_o=>{}); 的話，當輸入!help 時候就會先刪除!help的信息，然後再發送下面信息
    return message.channel.send("```完全沒有幫助。。。```");
  }
  
  if(cmd === `${prefix}ping`){
	  return message.channel.send("Pong!");
  }
  
  if(cmd === `${prefix}random`){
	  request.get('https://duckduckdoc.tk/redirect', {},
	  function(error, response, body){
	if(response.statusCode == 200){
		const embed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('隨機圖片')
		.setURL(response.request.uri.href)
		.setDescription('MCwind 隨機圖片API')
		.setImage(response.request.uri.href);
		message.channel.send(embed);
	}
	else {}
	return;
  })}
 
});

// 如果想自動刪除觸發指令的信息，加入這句-->   message.delete().catch(O_o=>{}); 
// 會自動刪除頻道最後一條信息
