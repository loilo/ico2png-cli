module.exports = require('yargs')
  .locale('en')
  .options({
    out: {
      alias: 'o',
      describe: 'The directory to write the exported images to. Uses the respective input directories by default.',
      type: 'string'
    },
    name: {
      alias: 'n',
      default: '{file}-{size}.png',
      describe: `
A template for the output file names with {tokens}.
Available tokens:
#        Number of the currently exported image, starting with 1
file     The original file name without file extension
size     The size of the exported image if it's square, equals {width}-{height} else
width    The width of the exported image
height   The height of the exported image
bit      The bit depth of the exported image
`.trim(),
      type: 'string'
    },
    override: {
      alias: 'r',
      describe: 'Override existing extracted images with conflicting names.',
      type: 'boolean'
    },
    size: {
      alias: 's',
      describe: 'Restrict exporting to square icons of the given size.',
      type: 'number'
    },
    width: {
      alias: 'w',
      describe: 'Restrict exporting to icons of the given width.',
      type: 'number'
    },
    height: {
      alias: 'h',
      describe: 'Restrict exporting to icons of the given height.',
      type: 'number'
    },
    minWidth: {
      describe: 'Restrict exporting to icons of the minimum given width.',
      type: 'number'
    },
    minHeight: {
      describe: 'Restrict exporting to icons of the minimum given height.',
      type: 'number'
    },
    maxWidth: {
      describe: 'Restrict exporting to icons of the maximum given width.',
      type: 'number'
    },
    maxHeight: {
      describe: 'Restrict exporting to icons of the maximum given height.',
      type: 'number'
    },
    bit: {
      alias: 'b',
      describe: 'Restrict exporting to icons with the given bit depth.',
      type: 'number'
    }
  })
  .help()
  .argv