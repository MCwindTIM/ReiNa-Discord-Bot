const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
var request = require ("request");

bot.login(botconfig.token);

bot.on("ready", async () => {
  console.log(`${bot.user.username} 上線!`);
  	bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let cont = message.content.slice(prefix.length).split(" ");
  let argsclear = cont.slice(1);

  if(cmd === `${prefix}help`){
	  message.delete(); 
    return message.channel.send("下面有可以使用的指令哦 請 " + `${message.author}` + " 耐心看完 最後更新201907230549\n```\n--實用指令--\nrn!clear [數目]    清除信息\nrn!say [單字/句子] 能讓我乖乖的跟著你說一次\nrn!me [單字/句子]  用自己做句 例:rn!me nya 輸出:@自己 nya\nrn!img            請求隨機動漫圖片！\n-------------------------------------------------------\n\n--圖片--\nrn!no\nrn!green\nrn!$\nrn!$$\nrn!$$$\nrn!tea\nrn!onemanarmy\nrn!非洲\nrn!money\nrn!loading\nrn!drug\nrn!stella!\n-----------\n\n--特殊指令--\nrn!mememe\nrn!課金課曬佢\n------------------------------------------------```");
  }
  
  if(cmd === `${prefix}ping`){
	  message.delete(); 
	  return message.channel.send("Pong!");
  }
  
  if(cmd === `${prefix}img`){
	  request.get('https://duckduckdoc.tk/redirect', {},
	  function(error, response, body){
	if(response.statusCode == 200){
		const embed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('MCwind 隨機圖片API')
		.setURL(response.request.uri.href)
		.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
		.setImage(response.request.uri.href)
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
		message.delete();
		message.channel.send(embed);
	}
	else {}
	return;
  })}
 
  if(cmd === `${prefix}clear`){
	  async function clear(){
		  
		  message.delete();
		  
		  if(isNaN(argsclear[0])){
			  message.channel.send("請輸入有效數目!")
			 return;
		  }
		  
		  const fetched = await message.channel.fetchMessages({limit: argsclear[0]});
		  console.log('正在刪除 ' + fetched.size + ' 條信息...');
		  
		
		  message.channel.bulkDelete(fetched)
		  message.channel.send(`${message.author}` + "刪除了" + cont.slice(1) + "條信息")
		}
		
		clear();
		
  }
  
  if(cmd === `${prefix}say`){
	  message.delete();
	  message.channel.send(argsclear[0])
  }
  
    if(cmd === `${prefix}me`){
	  message.delete();
	  message.channel.send(`${message.author}` + argsclear[0])
  }
  
	if(cmd === `${prefix}no`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/nonono.jpg"]})	
	}
	
	if(cmd === `${prefix}green`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/green.jpg"]})	
	}
	
	if(cmd === `${prefix}$`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/$.jpg"]})	
	}
  
  	if(cmd === `${prefix}$$`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/$$.jpg"]})	
	}
  
    if(cmd === `${prefix}$$$`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/$$$.jpg"]})	
	}
	
	if(cmd === `${prefix}tea`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/tea.jpg"]})	
	}
	
	if(cmd === `${prefix}onemanarmy`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/onemanarmy.jpg"]})	
	}
	
	if(cmd === `${prefix}非洲`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/feizhou.jpg"]})	
	}
  
  	if(cmd === `${prefix}money`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/money.jpg"]})	
	}
	
	if(cmd === `${prefix}loading`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/loading.gif"]})	
	}
	
	if(cmd === `${prefix}drug`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/drug.gif"]})	
	}
	
	if(cmd === `${prefix}stella`){
		message.delete();
		message.channel.send(`${message.author}` + "表示", {files: ["https://duckduckdoc.tk/wp-content/uploads/googledrive/stella.gif"]})	
	}
	
	if(cmd === `${prefix}mememe`){
		message.delete();
		message.channel.send(`${message.author}` + "https://www.youtube.com/watch?v=OODugXYqyy4&feature=youtu.be")
	}
	
	if(cmd === `${prefix}課金課曬佢`){
		message.delete();
		message.channel.send("https://youtu.be/ouchD3lTs58?t=1m33s")
	}
	
});

// 如果想自動刪除觸發指令的信息，加入這句-->   message.delete().catch(O_o=>{}); 
// 會自動刪除頻道最後一條信息
