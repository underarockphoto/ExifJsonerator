const {directoriesAreValid} = require('../modules/directoriesAreValid')

const goodPhotoDirectory = "./tests/testPhotos"
const goodOutputDirectory = "./README.md"
const goodOverwriteFile = "./tests/exampleObjects/exampleOverwriteFile.json"
const badPhotoDirectory = "./testPhotos"
const badOutputDirectory = "./READMEidonotexist.md"
const badOverwriteFile = "./exampleOverwriteFile.json"

test('If all directories are good, validateDirectories returns true',()=>{
    expect(directoriesAreValid(goodPhotoDirectory,goodOutputDirectory,goodOverwriteFile)).toBe(true)
})
test('Any bad directories returns an array of errors noting such',()=>{
    const errorArray = ['ERROR - Photo directory file path '+badPhotoDirectory+' does not exist.','ERROR - Output directory file path '+badOutputDirectory+' does not exist.','ERROR - Overwrite file '+badOverwriteFile+' does not exist.']
    expect(directoriesAreValid(badPhotoDirectory,badOutputDirectory,badOverwriteFile)).toStrictEqual(errorArray)
})