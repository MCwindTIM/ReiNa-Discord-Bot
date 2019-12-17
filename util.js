module.exports = {
    async sendDeletableMessage(channel, message, author, trigger) {
        const sentMessage = await channel.send(message);
        await sentMessage.react('🗑');
        const collector = sentMessage.createReactionCollector((reaction, user) => reaction.emoji.name === '🗑' && !user.bot && user.id === author.id || reaction.message.member.hasPermission('MANAGE_MESSAGES') === true && !user.bot, { time: 1000 * 60 * 10, max: 1 });
        collector.on('end', async collected => {
            if (collected.size) {
                try {
                    await sentMessage.delete().catch((e) => { });
                    if (trigger) {
                        await trigger.delete().catch((e) => { });
                    }
                } catch (err) { }
                return;
            }
            if (sentMessage.guild.me.hasPermission('MANAGE_MESSAGES')) { await sentMessage.clearReactions() }
			else{ sentMessage.clearReactions() }
        })
        return sentMessage;
    }
};
