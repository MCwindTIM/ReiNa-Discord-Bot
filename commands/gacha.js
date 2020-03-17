const Discord = require("discord.js");
const util = require('../util.js');
const snek = require('snekfetch');
const Canvas = require('canvas');
module.exports.run = async (bot, message, args) =>{
		message.delete();
		if(args[0] === "1"){
		snek.get(`https://duckduckdoc.tk/nobuDB-master/gatcha.json`).then(r => {
			r = r.body;
			  const canvas = Canvas.createCanvas(129, 222);
			  const ctx = canvas.getContext('2d');
			  roll1(ctx, r, [0, 0]).then((result) => {
				message.channel.send(`${message.author}` + `卡池大規模更新中，所有英靈都加入卡池列表，禮裝待更新:\`\`\`\n${result}\`\`\``, {file: {attachment: canvas.toBuffer(), name: "result.png"}});
			  });
		  });
		}else{
			snek.get(`https://duckduckdoc.tk/nobuDB-master/gatcha.json`).then(r => {
				r = r.body;
				const canvas = Canvas.createCanvas(645, 444);
				const ctx = canvas.getContext('2d');
				roll10(ctx, r).then((results) => {
					results = results.slice(0, 5).join(' | ') + "\n" + results.slice(5).join(' | ');
					message.channel.send(`${message.author}` + `卡池大規模更新中，所有英靈都加入卡池列表，禮裝待更新:\`\`\`\n${results}\`\`\``, {file: {attachment: canvas.toBuffer(), name: "result.png"}});
				});
			});
		}
}

module.exports.help = {
	name: "gacha",
	description: "GachaGachaGacha",
	cate: 8,
	show: true
	
}

function getCard(data, rate) {
    let dice = Math.random() * 100;
    let item = "";
    if (dice <= rate["s5"])      item = 'S/'  + ARand(data.servants["5"]); 
    else if (dice <= rate["s4"]) item = 'S/'  + ARand(data.servants["4"]);
    else if (dice <= rate["s3"]) item = 'S/'  + ARand(data.servants["3"]);
    else if (dice <= rate["c5"]) item = 'CE/' + ARand(data.ce["5"]);
    else if (dice <= rate["c4"]) item = 'CE/' + ARand(data.ce["4"]);
    else if (dice <= rate["c3"]) item = 'CE/' + ARand(data.ce["3"]);
    return item;
}

function ARand(array) {
    if (array.length == 1) return array[0];
    return array[rand(0, array.length - 1)];
}

function roll1 (ctx, data, pos, rate) {
    return new Promise((resolve, reject) => {
	  let Rest = {s5: 1, s4: 4, s3: 20, c5: 24, c4: 36, c3: 100};
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
	const GSR = {s5: 1, s4: 20, c5: 24, c4: 100};
	const GS = {s5: 1, s4: 4, s3: 100};
    let results = Array(10).fill('');
    results = results.map((item, index) => {
      if (index < 5) index = [index * 129, 0];
      else index = [(index - 5) * 129, 222];
      if (index == 0) return roll1(ctx, data, index, GSR);
      if (index == 1) return roll1(ctx, data, index, GS);
      return roll1(ctx, data, index);
    });
	return Promise.all(results);
}