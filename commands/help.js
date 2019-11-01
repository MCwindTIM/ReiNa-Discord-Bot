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
			.setDescription("下面有可以使用的指令哦 請 " + `${message.author}` + " 耐心看完 最後更新201910200257\n```\n--實用指令--\nrn!clear [數目]  清除信息\nrn!myid       查看ID\nrn!timer [start/stop]   計時器指令\nrn!avatar     獲取你的Discord頭像\nrn!avatar [@某使用者]    獲得該使用者頭像\nrn!roll [最大數值]    隨機抽出一個數字!\nrn!say [單字/句子] 能讓我乖乖的跟著你說一次\nrn!me [單字/句子]  用自己做句 例:rn!me nya 輸出:@自己 nya\nrn!invite         邀請由MCwind製作/更新的Discord機械人！\nrn!r6 [平台] [玩家UID]   查詢R6玩家資料!\nrn!img            請求隨機動漫圖片！\nrn!hentai         請求隨機本子\nrn!img-glasses    請求隨機眼睛娘圖片！\nrn!img-nsfw       可能含有18+內容！\nrn!ebase [信息]     加密信息\nrn!dbase [信息]     解密信息\nrn!dec [十進制數值]    輸入數值轉換至其他進制\nrn!hex [十六進制數值]  輸入數值轉換至其他進制\nrn!bin [二進制數值]    輸入數值轉換至其他進制\nrn!flux [數值]    輸入港幣獲得可以購買的flux數量!\nrn!play [Youtube 連結/關鍵字]   播放音樂\nrn!stop   停止播放音樂並退出語音頻道\nrn!pause   暫停播放音樂\nrn!resume   繼續播放音樂\nrn!volume [數值]   調整音量\nrn!db[數值]   以分貝調整音量\nrn!skip   跳過正在播放中的音樂\nrn!np   顯示現在播放中的音樂\nrn!queue   顯示播放列表\n-------------------------------------------------------\n\n--圖片--\nrn!no\nrn!green\nrn!$\nrn!$$\nrn!$$$\nrn!tea\nrn!onemanarmy\nrn!bb\nrn!非洲\nrn!money\nrn!loading\nrn!drug\nrn!stella!\n-----------\n\n--特殊指令--\nrn!mememe\nrn!課金課曬佢\n------------------------------------------------```")
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
			.setTimestamp();
			try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
			 console.error(err);
			}
}

module.exports.help = {
	name: "help"
}