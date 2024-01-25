
const {showErrorsAndWarnings} = require("./modules/showErrorsAndWarnings")
const {directoriesAreValid} = require('./modules/directoriesAreValid')
const {getArrayOfFiles} = require('./modules/getArrayOfFiles')
const showOpeningDisplay = require('./modules/showOpeningDisplay')

const photoInputDirectory = "./tests/testPhotos"
const outputFileDirectory = "./README.md"
const overwriteJsonFile = "./tests/exampleObjects/exampleOverwriteFile.json"

showOpeningDisplay()
const validatedDirectories = directoriesAreValid(photoInputDirectory,outputFileDirectory,overwriteJsonFile)
if(validatedDirectories===true){
    const fileArray = getArrayOfFiles(photoInputDirectory)
}
else showErrorsAndWarnings(validatedDirectories)