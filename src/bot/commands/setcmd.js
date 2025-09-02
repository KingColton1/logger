module.exports = {
  name: 'setcmd',
  description: 'Set custom command (owner only)',
  options: [
    {
      type: 3, // STRING
      name: 'command',
      description: 'Command to set',
      required: true
    },
    {
      type: 3, // STRING
      name: 'response',
      description: 'Response for the command',
      required: true
    }
  ],
  type: 'creator',
  async execute(interaction) {
    if (!process.env.CREATOR_IDS.split(',').includes(interaction.member.user.id)) {
      return interaction.createMessage({ content: 'This command is owner only.', flags: 64 })
    }
    const command = interaction.data.options.find(opt => opt.name === 'command').value
    const response = interaction.data.options.find(opt => opt.name === 'response').value
    // ...actual set command logic here...
  await interaction.createMessage({ content: `Custom command \`${command}\` set.`, flags: 64 })
  }
}
