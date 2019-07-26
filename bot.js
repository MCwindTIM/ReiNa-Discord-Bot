const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const util = require('./util.js');
var request = require ("request");

bot.login(botconfig.token);

bot.on("ready", async () => {
	console.log(`${bot.user.username} 上線!`);
    console.log(`加入了 ${bot.guilds.size} 個伺服器.`);
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
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription("下面有可以使用的指令哦 請 " + `${message.author}` + " 耐心看完 最後更新201907262016\n```\n--實用指令--\nrn!clear [數目]    清除信息\nrn!say [單字/句子] 能讓我乖乖的跟著你說一次\nrn!me [單字/句子]  用自己做句 例:rn!me nya 輸出:@自己 nya\nrn!invite         邀請由MCwind製作/更新的Discord機械人！\nrn!img            請求隨機動漫圖片！\nrn!img-glasses    請求隨機眼睛娘圖片！\nrn!img-nsfw       可能含有18+內容！\n-------------------------------------------------------\n\n--圖片--\nrn!no\nrn!green\nrn!$\nrn!$$\nrn!$$$\nrn!tea\nrn!onemanarmy\nrn!bb\nrn!非洲\nrn!money\nrn!loading\nrn!drug\nrn!stella!\n-----------\n\n--特殊指令--\nrn!mememe\nrn!課金課曬佢\n------------------------------------------------```")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
}
  
  if(cmd === `${prefix}ping`){
	  message.delete(); 
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setDescription(`Pong!`)
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
                .setTimestamp()
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
  }
  
  if(cmd === `${prefix}img`){
	  request.get('https://duckduckdoc.tk/redirect-api', {},
	  function(error, response, body){
	if(response.statusCode == 200){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('MCwind 隨機圖片API')
		.setURL(response.request.uri.href)
		.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
		.setImage(response.request.uri.href)
		.setTimestamp()
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	return;
  })}
  
    if(cmd === `${prefix}img-nsfw`){
	  request.get('https://duckduckdoc.tk/redirect-all', {},
	  function(error, response, body){
	if(response.statusCode == 200){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('MCwind 隨機圖片API [NSFW]')
		.setURL(response.request.uri.href)
		.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
		.setImage(response.request.uri.href)
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	return;
  })}
  
    if(cmd === `${prefix}img-glasses`){
	  request.get('https://duckduckdoc.tk/redirect-glasses', {},
	  function(error, response, body){
	if(response.statusCode == 200){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('MCwind 眼鏡娘API')
		.setURL(response.request.uri.href)
		.setDescription(`${message.author}` + ' Senpai, 你要求的眼鏡娘在這。')
		.setImage(response.request.uri.href)
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	return;
  })}
 
  if(cmd === `${prefix}clear`){
	  async function clear(){
		  
		  message.delete();
		  
		  if(isNaN(argsclear[0])){
		  	const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription("請輸入有效數目!")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
			 return;
		  }
		  
		  const fetched = await message.channel.fetchMessages({limit: argsclear[0]});
		  console.log('正在刪除 ' + fetched.size + ' 條信息...');
		  
		
		  message.channel.bulkDelete(fetched)
		  	const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "刪除了" + cont.slice(1) + "條信息" + "\n我只可以刪除14日內的信息")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
		}
		
		clear();
		
  }
  
  if(cmd === `${prefix}say`){
	  message.delete();
	  let botmessage = args.join(" ");
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(botmessage)
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
  }
  
    if(cmd === `${prefix}me`){
	  message.delete();
	  	const embed = new Discord.RichEmbed()
		let botmessage = args.join(" ");
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + " " + botmessage)
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
  }
  
	if(cmd === `${prefix}no`){
		message.delete();
			  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/nonono.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}green`){
		message.delete();
			 const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/green.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}$`){
		message.delete();
			  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
  	if(cmd === `${prefix}$$`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$$.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
    if(cmd === `${prefix}$$$`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$$$.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}tea`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/tea.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}onemanarmy`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/onemanarmy.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}非洲`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/feizhou.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
  	if(cmd === `${prefix}money`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/money.jpg")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}loading`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/loading.gif")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}drug`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/drug.gif")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}stella`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/stella.gif")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }	
	}
	
	if(cmd === `${prefix}bb`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/beautiful.png")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}mememe`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setTitle('[GAY Youtube]')
		.setURL("https://www.youtube.com/watch?v=OODugXYqyy4&feature=youtu.be")
		.setColor('#0099ff')
		.setDescription("這是" + `${message.author}` + " 的請求")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}課金課曬佢`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setTitle('[課金課曬佢 Youtube]')
		.setURL("https://youtu.be/ouchD3lTs58?t=1m33s")
		.setColor('#0099ff')
		.setDescription("這是" + `${message.author}` + " 的請求")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}invite`){
		message.delete();
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setColor('#0099ff')
		.setDescription("這是" + `${message.author}` + " 的請求，你可以用以下鏈接邀請機械人\n\n\nReiNa Bot\n<https://discordapp.com/api/oauth2/authorize?client_id=418095978273570846&permissions=8&scope=bot>\n\nReiNa-AntiSpam\n<https://discordapp.com/api/oauth2/authorize?client_id=454324523571871754&permissions=8&scope=bot>\n\nReiNa-Cards\n<https://discordapp.com/api/oauth2/authorize?client_id=418363084508495872&permissions=8&scope=bot>\n\nReiNa-Music\n<https://discordapp.com/api/oauth2/authorize?client_id=423846938467762187&permissions=8&scope=bot>\n\nReiNa-WebSocket\n<https://discordapp.com/api/oauth2/authorize?client_id=580129877953609739&permissions=8&scope=bot>\n\nReiNa-LocalMusic\n<https://discordapp.com/api/oauth2/authorize?client_id=440968183277682708&permissions=8&scope=bot>\n\n飆車之鬼\n<https://discordapp.com/api/oauth2/authorize?client_id=601861890036989983&permissions=8&scope=bot>")
		.setFooter('ReiNa By MCwind#9801', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	
});
