const fs = require('fs-extra')

const MP3 = '.mp3'
const OUTPUT = './tools/output'
const INPUT = './tools/input'

const sounds = fs.readdirSync(INPUT).filter((file) => isMp3(file))
const soundsJson = sounds
  .map(removeExt)
  .map((sound) => ({
    name: toValidFormat(sound),
    title: sound
  }))

soundsJson.forEach(copyMp3)

fs.writeFileSync(OUTPUT + '/sounds.json', JSON.stringify(soundsJson, null, 2))

console.log('All done!') // eslint-disable-line no-console

function toValidFormat(string) {
  const withoutSpaces = string.replace(/\s+/g, '-')
  return encodeURIComponent(withoutSpaces)
    .replace(/%\d\d|'/g, '')
    .toLowerCase()
}

function removeExt(filename) {
  return filename.slice(0, filename.length - MP3.length)
}

function isMp3(filename) {
  const extIndex = filename.indexOf(MP3)
  return extIndex > -1 && extIndex === filename.length - MP3.length
}

function copyMp3(sound) {
  fs.copySync(`${INPUT}/${sound.title}.mp3`, `${OUTPUT}/${sound.name}.mp3`)
}
