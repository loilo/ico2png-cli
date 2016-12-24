const fs = require('fs')

// Checks synchronously if a path exists
const pathExists = (path, access = fs.F_OK) => {
  try {
    fs.accessSync(path, access)
    return true
  } catch (e) {
    return false
  }
}

// Checks synchronously if a path exists and is a directory
const dirExists = (path, access = fs.F_OK) => {
  return pathExists(path, access) && fs.statSync(path).isDirectory()
}

// Print out an error and exit
const error = msg => {
  const chalk = require('chalk')
  console.error(chalk.red(msg))
  process.exit()
}

module.exports = {
  pathExists,
  dirExists,
  error
}