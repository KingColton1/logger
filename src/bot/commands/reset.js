module.exports = {
  name: 'reset',
  description: 'Reset bot state (owner only)',
  type: 'creator',
  async execute(interaction) {
    if (!process.env.CREATOR_IDS.split(',').includes(interaction.member.user.id)) {
      return interaction.createMessage({ content: 'This command is owner only.', flags: 64 })
    }
    // ...actual reset logic here...
    await interaction.createMessage({ content: 'Bot state reset.', flags: 64 })
  }
}
