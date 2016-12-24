#!/usr/bin/env node
const argv = require('./cli-config')
const { pathExists, dirExists, error } = require('./helpers')

const fs = require('fs')
const chalk = require('chalk')
const glob = require('glob')
const path = require('path')

// The input argument from the CLI
let input

// If the input argument has any glob magic
let inputMagic = true

// The files to be converted
let files

// The output directory
let outDir = argv.o

// Check input
if (typeof argv._[0] !== 'string') {
  error('Missing icons to convert (first argument). May be a directory path or a glob.')

// Input given, let's handle it
} else {
  input = argv._[0]

  // No magic
  if (!glob.hasMagic(input)) {
    inputMagic = false

    // No magic -> must be existing + accessible directory
    if (!pathExists(input)) {
      error('Input must be a glob or an existing file / directory.')
    } else if (!pathExists(input, fs.R_OK)) {
      error('Input exists but is not accessible.')
    }

    if (fs.statSync(input).isDirectory()) {
      files = glob.sync(path.join(input, '*.ico'), { absolute: true })
    } else {
      files = [ input ]
    }
  } else {
    console.log()
    process.stdout.write('Resolving files... ')
    files = glob.sync(input, { absolute: true })
    process.stdout.write(chalk.green('Done.') + require('os').EOL)
  }
}

if (!files.length) {
  error('No input files found.')
}
console.log()
console.log(`Found ${chalk.cyan(files.length)} files.`)

if (argv.override) {
  console.log(chalk.yellow(`Existing images with conflicting file names will be overriden.`))
  console.log()
}


// Add filters
const filters = require('./filters')(argv)

if (filters.length) {
  console.log()
  console.log('Images must match the following criteria:')
  filters.forEach(filter => {
    console.log(`- ${filter.description}`)
  })
}

// Iterate over files
const ICO = require('icojs')
const formatter = require('string-template')
const arrayBufferToBuffer = require('arraybuffer-to-buffer')

console.log()
const ProgressBar = require('progress')
const progress = new ProgressBar(`Converting [${chalk.magenta(':bar')}] ${chalk.green(':percent')}`, {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: files.length + 1
})
progress.tick(1)

let counter = 0
let errors = []
let skipped = []
let extractedImages = 0

if (argv.out) {
  require('mkdirp').sync(argv.out)
}

files.forEach(file => {
  try {
    const arrayBuffer = new Uint8Array(fs.readFileSync(file)).buffer
    ICO
      .parse(arrayBuffer)
      .then(images => {
        for (let i = 0; i < filters.length; i++) {
          images = images.filter(filters[i].validator)
        }

        let outDir = argv.out ? argv.out : path.dirname(file)

        // Write files
        images.forEach(image => {
          extractedImages++

          const filename = formatter(argv.name, {
            nr: String(extractedImages),
            file: path.basename(file, path.extname(file)),
            size: image.width === image.height ? String(image.width) : `${image.width}-${image.height}`,
            width: String(image.width),
            height: String(image.height),
            bit: String(image.bit)
          })
          const filepath = path.join(outDir, filename)

          try {
            fs.accessSync(filepath, fs.F_OK)

            if (argv.override) {
              fs.writeFileSync(filepath, arrayBufferToBuffer(image.buffer))
            } else {
              skipped.push(filepath)
              extractedImages--
            }
          } catch (e) {
            fs.writeFileSync(filepath, arrayBufferToBuffer(image.buffer))
          }
        })

        counter++
        progress.tick(1)

        if (counter === files.length) {
          console.log()

          if (skipped.length) {
            console.log(chalk.yellow(`Skipped ${chalk.bold(skipped.length)} images due to naming conflicts.`))
            console.log()
          }

          if (!errors.length) {
            console.log(chalk.green(`Done.`))
            console.log(`Extracted ${chalk.cyan(extractedImages)} images from ${chalk.cyan(files.length)} files.`)
          } else {
            console.log(chalk.red(`Failed to extract images from ${chalk.bold(errors.length)} files:`))
            errors.forEach(file => {
              console.log(chalk.red(`- ${file}`))
            })
            console.log()
            console.log(chalk.yellow(`Done ${chalk.bold(files.length - errors.length)} out of ${chalk.bold(files.length)} files.`))
            console.log(`Extracted ${chalk.cyan(extractedImages)} images.`)
          }
        }
      })
      .catch(err => {
        error('Unexpected error.')
        console.error(err)
      })
  } catch (e) {
    counter++
    errors.push(file)
    progress.tick(1)
  }
})