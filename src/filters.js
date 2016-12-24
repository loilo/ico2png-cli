const { error } = require('./helpers')

module.exports = argv => {
  const filters = []

  // Use exact square size
  if (argv.size) {
    if (argv.size < 1) error('The "size" argument must not be smaller than 1')
    filters.push({
      description: `is square and has ${argv.size} pixels edge length`,
      validator: obj => obj.width === obj.height && obj.width === argv.size
    })
  } else {
    // Use exact width
    if (argv.width) {
      if (argv.width < 1) error('The "width" argument must not be smaller than 1')
      filters.push({
        description: `exactly ${argv.width} pixels wide`,
        validator: obj => obj.width === argv.width
      })

    // Declare width range
    } else {
      // Minimum width
      if (argv.minWidth) {
        if (argv.minWidth < 1) error('The "minWidth" argument must not be smaller than 1')
        filters.push({
          description: `at least ${argv.minWidth} pixels wide`,
          validator: obj => obj.width >= argv.minWidth
        })
      }

      // Maximum width
      if (argv.maxWidth) {
        if (argv.maxWidth < 1) error('The "maxWidth" argument must not be smaller than 1')
        filters.push({
          description: `at most ${argv.maxWidth} pixels wide`,
          validator: obj => obj.width <= argv.maxWidth
        })
      }

      // Valid range
      if (argv.minWidth && argv.maxWidth && argv.minWidth > argv.maxWidth) error('The "minWidth" argument must not be bigger than the "maxWidth" argument')
    }

    // Use exact height
    if (argv.height) {
      if (argv.height < 1) error('The "height" argument must not be smaller than 1')
      filters.push({
        description: `exactly ${argv.height} pixels wide`,
        validator: obj => obj.height === argv.height
      })

    // Declare height range
    } else {
      // Minimum height
      if (argv.minHeight) {
        if (argv.minHeight < 1) error('The "minHeight" argument must not be smaller than 1')
        filters.push({
          description: `at least ${argv.minHeight} pixels wide`,
          validator: obj => obj.height >= argv.minHeight
        })
      }

      // Maximum height
      if (argv.maxHeight) {
        if (argv.maxHeight < 1) error('The "maxHeight" argument must not be smaller than 1')
        filters.push({
          description: `at most ${argv.maxHeight} pixels wide`,
          validator: obj => obj.height <= argv.maxHeight
        })
      }

      // Valid range
      if (argv.minHeight && argv.maxHeight && argv.minHeight > argv.maxHeight) error('The "minHeight" argument must not be bigger than the "maxHeight" argument')
    }
  }

  if (argv.bit) {
    filters.push({
      description: `icon bit depth is ${argv.bit}`,
      validator: obj => obj.bit === argv.bit
    })
  }

  return filters
}