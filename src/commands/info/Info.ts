import { Command, Lavamusic, Context } from '../../structures/index.js';
import os from 'os';
import { version } from 'discord.js';

export default class Info extends Command {
  constructor(client: Lavamusic) {
    super(client, {
      name: 'info',
      description: {
        content: 'Information about the bot',
        examples: ['info'],
        usage: 'info',
      },
      category: 'info',
      aliases: ['botinfo', 'bi'],
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
    const osType = os.type();
    const osRelease = os.release();
    const osHostname = os.hostname();
    const cpuArch = os.arch();
    const cpuCores = os.cpus().length;
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const nodeVersion = process.version;
    const discordJsVersion = version;
    const botGuilds = client.guilds.cache.size;
    const botChannels = client.channels.cache.size;
    const botUsers = client.users.cache.size;
    const botCommands = client.commands.size;
    const uptime = process.uptime();
    const botUptime = `${Math.floor(uptime / 86400)}d ${Math.floor(uptime % 86400 / 3600)}h ${Math.floor(uptime % 3600 / 60)}m ${Math.floor(uptime % 60)}s`;

    const botInfo = `Bot Information:
- **Operating System**: ${osType} ${osRelease}
- **Hostname**: ${osHostname}
- **CPU Architecture**: ${cpuArch} (${cpuCores} cores)
- **Memory Usage**: ${client.utils.formatBytes(usedMem)} / ${client.utils.formatBytes(totalMem)} (${Math.round(
      (usedMem / totalMem) * 100,
    )}%)
- **Node.js Version**: ${nodeVersion}
- **Discord.js Version**: ${discordJsVersion}
- **Connected to** ${botGuilds} guilds, ${botChannels} channels, and ${botUsers} users
- **Total Commands**: ${botCommands}
- **Bot Uptime**: ${botUptime}
  `;

    const embed = this.client.embed();
    return ctx.sendMessage({
      embeds: [embed.setColor(this.client.color.main).setDescription(botInfo)],
    });
  }
  }
