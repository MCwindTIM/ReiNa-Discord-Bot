module.exports = {
    async sendDeletableMessage(channel, message, author, trigger) {
        const sentMessage = await channel.send(message);
        await sentMessage.react('🗑');
        const collector = sentMessage.createReactionCollector((reaction, user) => reaction.emoji.name === '🗑' && !user.bot && user.id === author.id, { time: 1000 * 60 * 10, max: 1 });
        collector.on('end', async collected => {
            if (collected.size) {
                try {
                    await sentMessage.delete().catch(err => { });
                    if (trigger) {
                        await trigger.delete().catch(err => { });
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