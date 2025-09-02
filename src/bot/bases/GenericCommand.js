// Deprecated: GenericCommand is no longer used for command registration.
// All commands should use the slash command format and be registered via commandIndexer.js.
module.exports = function DeprecatedGenericCommand() {
  global.logger.warn('GenericCommand is deprecated and no longer used. All commands should use the slash command format.')
}
