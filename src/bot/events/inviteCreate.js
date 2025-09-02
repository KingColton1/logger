const send = require('../modules/webhooksender')
const inviteCache = require('../modules/invitecache')

module.exports = {
  name: 'inviteCreate',
  type: 'on',
  handle: async (guild, invite) => {
    await inviteCache.insertInvite(guild.id, invite)
    const inviteCreateEvent = {
      embeds: [{
        description: `Invite \`${invite.code}\` created by ${invite.inviter ? invite.inviter.username + '#' + invite.inviter.discriminator : 'Unknown'}`,
        fields: [
          { name: 'Channel', value: `<#${invite.channel.id}> (${invite.channel.name})` },
          { name: 'Max Uses', value: invite.maxUses ? invite.maxUses.toString() : 'Unlimited' },
          { name: 'Expires At', value: invite.expiresAt ? new Date(invite.expiresAt).toUTCString() : 'Never' }
        ],
        color: 3066993
      }]
    }
    await send({
      guildID: guild.id,
      eventName: 'inviteCreate',
      embeds: inviteCreateEvent.embeds
    })
  }
}
