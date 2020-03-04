const Discord = require("discord.js");
const util = require('../util.js');
const snek = require('snekfetch');
const Canvas = require('canvas');
module.exports.run = async (bot, message, args) =>{
		message.delete();
		if(args[0] === "1"){
		snek.get(`https://duckduckdoc.tk/nobuDB-master/ReDive.json`).then(r => {
			r = r.body;
			  const canvas = Canvas.createCanvas(96, 96);
			  const ctx = canvas.getContext('2d');
			  roll1(ctx, r, [0, 0]).then((result) => {
				message.channel.send(`${message.author}` + `卡池幾率【3★ 2.5%】 【2★ 18%】 【1★ 79.5%】:\`\`\`\n${result}\`\`\``, {file: {attachment: canvas.toBuffer(), name: "result.png"}});
			  });
		  });
		}else{
			snek.get(`https://duckduckdoc.tk/nobuDB-master/ReDive.json`).then(r => {
				r = r.body;
				const canvas = Canvas.createCanvas(480, 192);
				const ctx = canvas.getContext('2d');
				roll10(ctx, r).then((results) => {
					results = results.slice(0, 5).join(' | ') + "\n" + results.slice(5).join(' | ');
					message.channel.send(`${message.author}` + `卡池幾率【3★ 2.5%】 【2★ 18%】 【1★ 79.5%】:\`\`\`\n${results}\`\`\``, {file: {attachment: canvas.toBuffer(), name: "result.png"}});
				});
			});
		}
}

module.exports.help = {
	name: "redive",
	description: "模擬公主連結抽卡",
	cate: 8,
	show: true
	
}

function getCard(data, rate) {
    let dice = Math.random() * 100;
    let item = "";
    if (dice <= rate["c3"])      item = 'ReDive/'  + ARand(data.character["3"]); 
    else if (dice <= rate["c2"]) item = 'ReDive/'  + ARand(data.character["2"]);
    else if (dice <= rate["c1"]) item = 'ReDive/'  + ARand(data.character["1"]);
    return item;
}

function ARand(array) {
    if (array.length == 1) return array[0];
    return array[rand(0, array.length - 1)];
}

function roll1 (ctx, data, pos, rate) {
    return new Promise((resolve, reject) => {
	  let Rest = {c3: 2.5, c2: 18, c1: 100};
      rate = rate || Rest;
      let card = new Canvas.Image();
      let item = getCard(data, rate);
      snek.get(`https://duckduckdoc.tk/nobuDB-master/images/${item}.png`).then(r => {
        card.onerror = reject;
        card.onload = () => {
          ctx.drawImage(card, ...pos);
          if (item.length == 5) item += " ";
          resolve(item);
        }
        card.src = r.body;
      });
    });
}

function rand(min, max) {
    max = max || 1;
    min = min || 0;
    if (max < min) return false;
	return Math.round((Math.random() * (max - min)) + min);
}

function roll10 (ctx, data) {
  const GRS = {c3: 2.5, c2: 60, c1: 100};
  const GS = {c3: 2.5, c2: 18, c1: 100};
    let results = Array(10).fill('');
    results = results.map((item, index) => {
      if (index < 5) index = [index * 96, 0];
      else index = [(index - 5) * 96, 96];
      if (index == 0) return roll1(ctx, data, index, GRS);
      if (index == 1) return roll1(ctx, data, index, GS);
      return roll1(ctx, data, index);
    });
	return Promise.all(results);
}