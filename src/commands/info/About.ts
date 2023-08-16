import { Command, Lavamusic, Context } from '../../structures/index.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default class About extends Command {
  constructor(client: Lavamusic) {
    super(client, {
      name: 'about',
      description: {
        content: 'Shows information about the bot',
        examples: ['about'],
        usage: 'about',
      },
      category: 'info',
      aliases: ['ab'],
      cooldown: 3,
      args: false,
      player: {
        voice: false,
        dj: false,
        active: false,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
        user: [],
      },
      slashCommand: true,
      options: [],
    });
  }
  public async run(client: Lavamusic, ctx: Context, args: string[]): Promise<void> {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Invite Me')
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=1046787923338612767&permissions=8&scope=bot%20applications.commands`,
        ),
      new ButtonBuilder().setLabel('Support Server').setStyle(ButtonStyle.Link).setURL('https://discord.gg/PwJSX4FQ4m'),
    );

    const embed = this.client
      .embed()
      .setAuthor({
        name: 'L hi',
        iconURL: 'https://media.tenor.com/gLWS9g70V5kAAAAM/the-bad-guys-diane-foxington.gif',
      })
      .setThumbnail(
        'https://media.tenor.com/gLWS9g70V5kAAAAM/the-bad-guys-diane-foxington.gif',
      )
      .setColor(this.client.color.main)
      .addFields([
        {
          name: 'Creator',
          value: 'UnpoeticNad aka Diane Foxington',
          inline: true,
        },
        {
          name: 'Support Server',
          value: '[Join](https://discord.gg/U4k6v7Dagr)',
          inline: true,
        },
      ]);
    return await ctx.sendMessage({
      content: '',
      embeds: [embed],
      components: [row],
    });
  }
      }
