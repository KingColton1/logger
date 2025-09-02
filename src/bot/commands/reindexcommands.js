module.exports = {
  name: 'reindexcommands',
  description: 'Reindex all commands (owner only)',
  type: 'creator',
  async execute(interaction) {
    if (!process.env.CREATOR_IDS.split(',').includes(interaction.member.user.id)) {
      return interaction.createMessage({ content: 'This command is owner only.', flags: 64 })
    }
    // ...actual reindex logic here...
    await interaction.createMessage({ content: 'Commands reindexed.', flags: 64 })
  }
}
