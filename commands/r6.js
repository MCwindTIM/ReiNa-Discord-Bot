const Discord = require("discord.js");
const util = require('../util.js');
const request = require ("request");

module.exports.run = async (bot, message, args) =>{
	let messageArray = message.content.split(" ");
	if(messageArray.length === 3){
		request.get('https://r6tab.com/api/search.php?platform=' + messageArray[1] + '&search=' + messageArray[2], {},
		function(error, response, body){
		if(response.statusCode == 200){
			message.delete();
			var checkuser = JSON.parse(body);
			listuser = Object.values(checkuser).toString();
			if(listuser.toString() != "0"){
				var obj = JSON.parse(body);
				info = Object.values(obj.results[0]).toString();
				infoarray = info.split(",");
				request.get('https://r6tab.com/api/player.php?p_id=' + infoarray[0], {},
				function(error, response, r6data){
					var rawr6data = JSON.parse(r6data);
					r6pdata = Object.values(rawr6data.data).toString();
					r6pdataarray = r6pdata.split(",");
					pvptime = parseInt(r6pdataarray[0]) + parseInt(r6pdataarray[5]);
					var rank = "";
					var updatetime1 = rawr6data.updatedon.replace('Updated ', '數據更新於 ');
					var updatetime2 = updatetime1.replace('<u>', '');
					var updatetime3 = updatetime2.replace('</u>', '');
					var updatetime4 = updatetime3.replace('hours', '小時');
					var updatetime5 = updatetime4.replace('minutes', '分鐘');
					var updatetime6 = updatetime5.replace('days', '日');
					var updatetime7 = updatetime6.replace('seconds', '秒');
					var updatetime8 = updatetime7.replace('second', '秒');
					var updatetime9 = updatetime8.replace('hour', '小時');
					var updatetime10 = updatetime9.replace('day', '日');
					var updatetime11 = updatetime10.replace('day', '日');
					var updatetime12 = updatetime11.replace('minute', '分鐘');
					var updatetime13 = updatetime12.replace(' ago', '前');
					var updatetime14 = updatetime13.replace('one', '1');
					var upadatetime15 = updatetime14.replace('now', '現在');
					
					
					var favatt = rawr6data.favattacker.toString();
					var favdef = rawr6data.favdefender.toString();
					var favattout = "";
					var favdefout = "";
					if(favatt == "2:4"){
						favattout = "Glaz";
					}
					if(favatt == "2:5"){
						favattout = "Blitz";
					}
					if(favatt == "2:6"){
						favattout = "Buck";
					}
					if(favatt == "2:7"){
						favattout = "Blackbeard";
					}
					if(favatt == "2:8"){
						favattout = "Capitao";
					}
					if(favatt == "2:9"){
						favattout = "Hibana";
					}
					if(favatt == "2:A"){
						favattout = "Jackal";
					}
					if(favatt == "2:B"){
						favattout = "Ying";
					}
					if(favatt == "2:D"){
						favattout = "Dokkaebi";
					}
					if(favatt == "3:2"){
						favattout = "Ash";
					}
					if(favatt == "3:4"){
						favattout = "Fuze";
					}
					if(favatt == "3:5"){
						favattout = "IQ";
					}
					if(favatt == "3:C"){
						favattout = "Zofia";
					}
					if(favatt == "3:E"){
						favattout = "Lion";
					}
					if(favatt == "4:1"){
						favattout = "Siedge";
					}
					if(favatt == "4:3"){
						favattout = "Twitch";
					}
					if(favatt == "4:E"){
						favattout = "Finka";
					}
					if(favatt == "5:1"){
						favattout = "Thatcher";
					}
					if(favatt == "5:2"){
						favattout = "Thermite";
					}
					if(favatt == "5:3"){
						favattout = "Montagne";
					}
					if(favatt == "2:11"){
						favattout = "Nomad";
					}
					if(favatt == "2:10"){
						favattout = "Maverick";
					}
					if(favatt == "2:12"){
						favattout = "Gridlock";
					}
					if(favatt == "1:5"){
						favattout = "GSG9 Recruit";
					}
					if(favatt == "1:4"){
						favattout = "Spetsnaz Recruit";
					}
					if(favatt == "1:3"){
						favattout = "GIGN Recruit";
					}
					if(favatt == "1:2"){
						favattout = "FBI Recruit";
					}
					if(favatt == "1:1"){
						favattout = "SAS Recruit";
					}
					if(favdef == "2:1"){
						favdefout = "Smoke";
					}
					if(favdef == "2:2"){
						favdefout = "Castle";
					}
					if(favdef == "2:3"){
						favdefout = "Doc";
					}
					if(favdef == "2:C"){
						favdefout = "Ela";
					}
					if(favdef == "2:F"){
						favdefout = "Maestro";
					}
					if(favdef == "3:1"){
						favdefout = "Mute";
					}
					if(favdef == "3:3"){
						favdefout = "Rook";
					}
					if(favdef == "3:6"){
						favdefout = "Frost";
					}
					if(favdef == "3:7"){
						favdefout = "Valkyrie";
					}
					if(favdef == "3:8"){
						favdefout = "Caveira";
					}
					if(favdef == "3:9"){
						favdefout = "Echo";
					}
					if(favdef == "3:A"){
						favdefout = "Mira";
					}
					if(favdef == "3:B"){
						favdefout = "Lesion";
					}
					if(favdef == "3:D"){
						favdefout = "Vigil";
					}
					if(favdef == "3:F"){
						favdefout = "Alibi";
					}
					if(favdef == "4:2"){
						favdefout = "Pulse";
					}
					if(favdef == "4:4"){
						favdefout = "Kapkan";
					}
					if(favdef == "4:5"){
						favdefout = "Jager";
					}
					if(favdef == "5:4"){
						favdefout = "Tachanka";
					}
					if(favdef == "5:5"){
						favdefout = "Bandit";
					}
					if(favdef == "3:11"){
						favdefout = "Kaid";
					}
					if(favdef == "3:10"){
						favdefout = "Clash";
					}
					if(favdef == "3:12"){
						favdefout = "Mozzie";
					}
					if(favdef == "1:5"){
						favdefout = "GSG9 Recruit";
					}
					if(favdef == "1:4"){
						favdefout = "Spetsnaz Recruit";
					}
					if(favdef == "1:3"){
						favdefout = "GIGN Recruit";
					}
					if(favdef == "1:2"){
						favdefout = "FBI Recruit";
					}
					if(favdef == "1:1"){
						favdefout = "SAS Recruit";
					}
					
					var rankpic = "";
					var mmr = parseInt(rawr6data.p_currentmmr)
					if(mmr === 0){
						rank = "未排名";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/0.png";
					}
					if(mmr >= 1 && mmr < 1200){
						rank = "Copper V 紫銅V";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/1.png";
					}
					if(mmr >= 1200 && mmr < 1300){
						rank = "Copper IV 紫銅IV";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/2.png";
						
					}
					if(mmr >= 1300 && mmr < 1400){
						rank = "Copper III 紫銅III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/3.png";
					}
					if(mmr >= 1400 && mmr < 1500){
						rank = "Copper II 紫銅II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/4.png";
					}
					if(mmr >= 1500 && mmr < 1600){
						rank = "Copper I 紫銅I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/5.png";
					}
					if(mmr >= 1600 && mmr < 1700){
						rank = "Bronze V 黃銅V";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/6.png";
					}
					if(mmr >= 1700 && mmr < 1800){
						rank = "Bronze IV 黃銅IV";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/7.png";
					}
					if(mmr >= 1800 && mmr < 1900){
						rank = "Bronze III 黃銅III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/8.png";
					}
					if(mmr >= 1900 && mmr < 2000){
						rank = "Bronze II 黃銅II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/9.png";
					}
					if(mmr >= 2000 && mmr < 2100){
						rank = "Bronze I 黃銅I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/10.png";
					}
					if(mmr >= 2100 && mmr < 2200){
						rank = "Silver V 白銀V";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/11.png";
					}
					if(mmr >= 2200 && mmr < 2300){
						rank = "Silver IV 白銀IV";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/12.png";
					}
					if(mmr >= 2300 && mmr < 2400){
						rank = "Silver III 白銀III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/13.png";
					}
					if(mmr >= 2400 && mmr < 2500){
						rank = "Silver II 白銀II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/14.png";
					}
					if(mmr >= 2500 && mmr < 2600){
						rank = "Silver I 白銀I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/15.png";
					}
					if(mmr >= 2600 && mmr < 2800){
						rank = "Gold III 黃金III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/16.png";
					}
					if(mmr >= 2800 && mmr < 3000){
						rank = "Gold II 黃金II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/17.png";
					}
					if(mmr >= 3000 && mmr < 3200){
						rank = "Gold I 黃金I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/18.png";
					}
					if(mmr >= 3200 && mmr < 3600){
						rank = "Platinum III 白金III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/19.png";
					}
					if(mmr >= 3600 && mmr < 4000){
						rank = "Platinum II 白金II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/20.png";
					}
					if(mmr >= 4000 && mmr < 4400){
						rank = "Platinum I 白金I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/21.png";
					}
					if(mmr >= 4400 && mmr < 5000){
						rank = "Diamond!!! 鑽石階級"
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/22.png";
					}
					if(mmr >= 5000){
						rank = "Champion!!! 冠軍階級";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/23.png";
					}
					const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setThumbnail(rankpic)
						.setColor('#0099ff')
						.setTitle("R6 玩家查詢 (詳細資料請點我 (=ﾟωﾟ)ﾉ)")
						.setURL('https://r6tab.com/' + rawr6data.p_id)
						.setDescription(`${message.author}` + " Senpai, 你請求的R6 Siege 玩家資料找到了~")
						.addField('玩家UID: ', rawr6data.p_name, true)
						.addField('玩家等級: ', rawr6data.p_level, true)
						.addField('平台: ', rawr6data.p_platform, true)
						.addField('現時積分: ', rawr6data.p_currentmmr, true)
						.addField('玩家排位: ', rank, true)
						.addField('玩家KD: ', parseInt(rawr6data.kd.toString()) / 100, true)
						.addField('爆頭率: ', parseInt(rawr6data.p_headshotacc.toString()) / 1000000 + "%", true)
						.addField('排位勝場: ', r6pdataarray[3], true)
						.addField('排位敗場: ', r6pdataarray[4], true)
						.addField('排位賽殺人數: ', r6pdataarray[1], true)
						.addField('排位賽死亡數: ', r6pdataarray[2], true)
						.addField('使用子彈數量: ', r6pdataarray[16], true)
						.addField('爆頭擊殺數: ', r6pdataarray[17], true)
						.addField('近戰擊殺數: ', r6pdataarray[18], true)
						.addField('施救隊友數: ', r6pdataarray[19], true)
						.addField('最喜歡攻方幹員: ', favattout, true)
						.addField('最喜歡守方幹員: ', favdefout, true)
						.addField('自殺次數: ', r6pdataarray[20], true)
						.addField('PVP遊玩時數(小時): ', Math.floor(pvptime / 60 / 60), true)
						.addField('數據更新: ', updatetime15, true)
						.setTimestamp()
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
						try {
							util.sendDeletableMessage(message.channel, { embed }, message.author);
						}   catch (err) {
							console.error(err);
						}
				})
			}
		else{
			const embed = new Discord.RichEmbed()
				embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                   .setTitle("ReiNa Bot R6指令錯誤")
                    .setURL("https://mcwind.tk")
                    .setDescription(`${message.author}` + " Senpai, 沒有找到該位玩家欸!")
					.setTimestamp()
                    .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                    try {
                        util.sendDeletableMessage(message.channel, { embed }, message.author);
                    }   catch (err) {
                        console.error(err);
                    }
		}
		}
		})
	}
	else{
		const embed = new Discord.RichEmbed()
		embed
		.setDescription("請輸入正確資料")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot 錯誤')
		.setURL("https://mcwind.tk")
		.addField('使用方法: ', "rn!r6 [平台] [玩家UID]\n平台輸入 `uplay` `psn` `xbl` 分別為Uplay, PlayStationNetwork, Xbox")
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
				console.error(err);
		}
		return;
	}
}

module.exports.help = {
	name: "r6"
}