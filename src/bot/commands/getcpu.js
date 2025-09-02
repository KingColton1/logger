const os = require('os-utils')

module.exports = {
  name: 'getcpu',
  description: 'Get CPU usage (owner only)',
  type: 'creator',
  async execute(interaction) {
    if (!process.env.CREATOR_IDS.split(',').includes(interaction.member.user.id)) {
      return interaction.createMessage({ content: 'This command is owner only.', flags: 64 })
    }
    os.cpuUsage(v => {
      interaction.createMessage({ content: `CPU Usage: ${(v * 100).toFixed(2)}%`, flags: 64 })
    })
  }
}
