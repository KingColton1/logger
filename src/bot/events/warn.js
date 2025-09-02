const send = require('../modules/webhooksender');

let noGuildCount = 0;

module.exports = {
  name: 'warn',
  type: 'on',
  handle: async (w, guild) => {
    if (typeof w === 'string') {
      if (w?.includes('Invalid session')) return
    }
    if (!guild) {
      noGuildCount++;
      if (noGuildCount === 1 || noGuildCount % 10 === 0) {
        console.warn(`[${noGuildCount}x] No guild context received. Skipping log.`);
      }
      return;
    } else if (noGuildCount > 0) {
      noGuildCount = 0;
    }
    await send({
      guildID: guild.id,
      eventName: 'warn',
      embeds: [{
        description: typeof w === 'string' ? w : JSON.stringify(w),
        color: 16776960
      }]
    })
  }
}
