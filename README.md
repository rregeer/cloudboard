[![Build Status](https://travis-ci.org/ngerritsen/cloudboard.svg?branch=master)](https://travis-ci.org/ngerritsen/cloudboard)

# Cloudboard

A shared soundboard. �

## Development

Clone this repo, make sure you have node 6 or higher. Then run:

```
npm install
npm start
```

You can now start coding 😎. When you make a pull request it will be automatically built and deployed after it is merged.

## Adding new sounds

This is as easy as putting the sounds in the sounds folder, inside the correct collection folder. Then edit the `etc/sound-collections.json`. The collection name should correspond to the collection folder name, the sound name should correspond to the mp3 file name (without `.mp3`). Sounds should have an url friendly name, only containing dashes and lower case characters.

You can generate correct sound file names and the json by putting the sounds inside a `tools/input` folder and running `npm run generate`. This will generate the 'sounds' part of the json and rename the files to an url friendly name, the output will reside in `tools/output`.
