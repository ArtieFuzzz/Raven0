import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class BigTiddyCommand extends Command {
	public constructor () {
		super('femboy', {
			aliases: ['femboy', 'femboys', 'femboi', 'fembois'],
			category: 'NSFW',
			description: 'Returns an Image from r/FemBoys',
			ratelimit: 3
		})

		this.help = {
			usage: 'femboy',
			examples: ['femboy', 'femboys', 'femboi', 'fembois']
		}
	}

	public async exec (message: Message): Promise<Message> {
		if (message.channel instanceof DMChannel) return await message.channel.send('You can\'t use this command in DMs!')
		if (!message.channel.nsfw) return await message.util.send(':x: This command only runs in NSFW channels')

		const { url, post } = await this.client.ksoft.images.reddit('FemBoys', { span: 'day', removeNSFW: false })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('PINK')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
