import { client, handler } from '../index';
import { Message } from 'discord.js';

export default async function onMessageCreate (message: Message) {
  if (message.author.bot || message.channel.type === 'DM') return;
  if (message.content.startsWith(client.prefix)) {
    const content = message.content.slice(client.prefix.length).trim();
    const args = content.split(/ +/g);
    const commandName = args.shift()?.toLowerCase();
    const command = handler.commands.get(commandName!) || handler.commands.find((cmd) => cmd.aliases.includes(commandName!));
    
    try {
      if (!command || !command.msgrun) return handler.err(message, commandName);
      command.msgrun(message, args);
    } catch(error) {
      if (client.debug) console.log(error); // 오류확인
      handler.err(message, commandName);
    } finally {
      client.msgdelete(message, 100, true);
    }
  } else {
    // code
  }
}