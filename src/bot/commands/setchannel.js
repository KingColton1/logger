module.exports = {
  name: 'setchannel',
  description: 'Set log channel (owner only)',
  options: [
    {
      type: 7, // CHANNEL
      name: 'channel',
      description: 'Channel to set as log channel',
      required: true
    }
  ],
  type: 'creator',
  async execute(interaction) {
    if (!process.env.CREATOR_IDS.split(',').includes(interaction.member.user.id)) {
      return interaction.createMessage({ content: 'This command is owner only.', flags: 64 })
    }
    const channel = interaction.data.options.find(opt => opt.name === 'channel').value
    // ...actual set channel logic here...
    await interaction.createMessage({ content: `Log channel set to <#${channel}>.`, flags: 64 })
  }
}
