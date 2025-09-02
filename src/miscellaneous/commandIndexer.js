const fs = require('fs')
const path = require('path')

module.exports = () => {
  const commandsPath = path.resolve('src', 'bot', 'commands')
  const files = fs.readdirSync(commandsPath)
  global.bot.commands = {}
  files.forEach(filename => {
    const commandModulePath = path.join(commandsPath, filename)
    if (require.cache[commandModulePath]) {
      delete require.cache[commandModulePath]
    }
    const command = require(commandModulePath)
    // Only register if it has a name and an execute function
    if (command && command.name && typeof command.execute === 'function') {
      global.bot.commands[command.name] = command
    } else {
      global.logger.warn(`Command ${filename} is missing a name or execute function and will not be registered.`)
    }
  })
}
