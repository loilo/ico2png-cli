# ico2png-cli
This command line utility extracts PNG images from `.ico` files. It's based on the amazing [icojs](https://npmjs.com/package/icojs) library.

## Install
```console
$ npm install --global ico2png-cli
```

*Note:* This tool uses ES2015 features that do require at least Node.js v6.

## Usage
Usage is dead simple:

```console
$ ico2png path/to/ico/files
```

The given path may either

* be a directory where the script looks for `.ico` files,
* point to an `.ico` file directly or
* be a glob string to find `.ico` files in a more advanced way.

*Note:* You might have to put a glob string into quotes if it's containing any asterisks.

### Options

There are a bunch of options available, you can get them from the built-in help:

```console
$ ico2png path/to/icons --help
```

---

**`--out, -o`** [ type: `String` ]

By default all extracted images will be placed in the folder of their source `.ico` file. Setting this flag will put them all into the given directory.

---


**`--name, -n`** [ type: `String`, default: `{file}-{size}.png` ]

A template for the output file names with tokens in curly braces.

Available tokens:

* `nr`: Number of the currently exported image, starting with 1
* `file`: The original file name without file extension
* `size`: The size of the exported image if it's square, else this equals `{width}-{height}`
* `width`: The width of the exported image
* `height`: The height of the exported image
* `bit`: The bit depth of the exported image

---

**`--override, -r`** [ type: `Boolean`, default: `false` ]

If this flag is set, existing extracted images with conflicting files names will be overridden.

---

**`--size, -s`** [ type: `Number` ]

Restrict exporting to square icons with the given edge length.

---

**`--width, -w`** [ type: `Number` ]

Restrict exporting to icons with the given width.

---

**`--height, -h`** [ type: `Number` ]

Restrict exporting to icons with the given height.

---

**`--minWidth`** [ type: `Number` ]

Restrict exporting to icons with the given minimum width.

---

**`--maxWidth`** [ type: `Number` ]

Restrict exporting to icons with the given maximum width.

---

**`--minHeight`** [ type: `Number` ]

Restrict exporting to icons with the given minimum height.

---

**`--maxHeight`** [ type: `Number` ]

Restrict exporting to icons with the given maximum height.

---

**`--bit, -b`** [ type: `Number` ]

Restrict exporting to icons with the given bit depth.