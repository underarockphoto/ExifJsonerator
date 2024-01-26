
// Inputs needed!
const photoInputDirectory = "./tests/testPhotos"
const outputFileDirectory = "./"
const overwriteJsonFile = "./tests/exampleObjects/exampleOverwriteFile.json"
const fileNameOutput = "exifData.json"

//Program stuff
const {showErrorsAndWarnings} = require("./modules/showErrorsAndWarnings")
const {directoriesAreValid} = require('./modules/directoriesAreValid')
const {getArrayOfFiles} = require('./modules/getArrayOfFiles')
const showOpeningDisplay = require('./modules/showOpeningDisplay')
const {getArrayOfExifData} = require('./modules/getExifData')
const buildExifObject = require("./modules/parses/buildExifObject")
const handleErrorsAndFinish = require("./modules/exportToJSON")


let errorArray = []
let newImgObj = [];
showOpeningDisplay()
const validatedDirectories = directoriesAreValid(photoInputDirectory,outputFileDirectory,overwriteJsonFile)
if(validatedDirectories===true){
    
    const fileArray = getArrayOfFiles(photoInputDirectory)
    if (typeof fileArray === "string") errorArray.push(fileArray)
    else {
    getArrayOfExifData(fileArray,photoInputDirectory)
    .then((res)=>{
            const exifArr = res[0]
            const errors = res[1]
            if (errors.length===0){
                exifArr.forEach((exif)=>{
                    const newImg = buildExifObject(exif)
                    newImgObj.push(newImg[0])
                    errorArray.push(newImg[1]);
                })
                showErrorsAndWarnings(errorArray)
                handleErrorsAndFinish(errorArray,newImgObj,outputFileDirectory,fileNameOutput)
            }else{
                errorArray.push(errors)
                showErrorsAndWarnings(errorArray)
            }
    })
}
    
}
else {
    errorArray.push(validatedDirectories)
showErrorsAndWarnings(errorArray)
}