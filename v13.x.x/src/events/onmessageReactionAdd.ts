import { client } from '../index';
import { MessageReaction, PartialMessageReaction, PartialUser, User } from 'discord.js';
import MDB from "../database/Mysql";

export default async function onmessageReactionAdd (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
  if (user.bot) return;
  if (!reaction.message.guildId) return;

  const guildDB = await MDB.get.guild(reaction.message.guild!);
  if (!guildDB) {
    if (client.debug) console.log('reaction 데이터베이스 검색 실패');
    return;
  }

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  const name = reaction.emoji.name;
  if (!name) return;
  if (reaction.message.channelId === "guildDB.channelId") {
    // code
  }
}

function smallnum(s: string): number {
  return s === "1️⃣" ? 1
    : s === "2️⃣" ? 2
    : s === "3️⃣" ? 3
    : s === "4️⃣" ? 4
    : 5
}