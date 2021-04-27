import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { inspect } from 'util'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class EvalCommand extends Command {
  public constructor () {
    super('eval', {
      aliases: ['eval'],
      category: 'Util',
      description: 'Check latency',
      ratelimit: 3,
			ownerOnly: true,
    })

    this.help = {
      usage: 'eval',
      examples: ['eval this.client']
    }
  }

  public async exec (message: Message): Promise<Message> {
		const prefix = process.env.CLIENT_PREFIX

    const embed = new MessageEmbed()
			.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

		const args = message.content.slice(prefix.length).trim()
			// eslint-disable-next-line require-unicode-regexp
			.split(/ +/g); args.shift();
		const query = args.join(' ');
		// eslint-disable-next-line no-shadow
		const code = (lang, code) => `\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``.replace(this.client.token, 'Uh oh! I can\'t do that!');

		if (!query) {
			message.channel.send('Please, write something so I can evaluate!');
		} else {
			try {
				// eslint-disable-next-line no-eval
				const evald = eval(query);
				const res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 });

				embed.addField('Result', code('js', res));


				if (!Boolean(res) || !Boolean(evald) && evald !== 0) {
					embed.setColor('RED');
				} else {
					embed
						.addField('Type', code('css', typeof evald))
						.setColor('GREEN');
				}
			}
			catch (error) {
				embed
					.addField('Error', code('js', error))
					.setColor('RED');
			}
			finally {
			return await message.channel.send(embed)
			}
		}
	}
}
