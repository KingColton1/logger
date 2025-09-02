module.exports = {
  name: 'reload',
  description: 'Reload bot modules (owner only)',
  type: 'creator',
  async execute(interaction) {
    if (!process.env.CREATOR_IDS.split(',').includes(interaction.member.user.id)) {
      return interaction.createMessage({ content: 'This command is owner only.', flags: 64 })
    }
    // ...actual reload logic here...
    await interaction.createMessage({ content: 'Bot modules reloaded.', flags: 64 })
  }
}
