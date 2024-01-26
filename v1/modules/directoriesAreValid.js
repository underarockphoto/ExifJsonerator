const fs = require('fs')
const {existsSync} = fs;

const directoriesAreValid = (photoDirectory,outputDirectory,overwriteFile)=>{
    console.log("Checking files and directories....")
    const photoDirectoryExists = existsSync(photoDirectory)
    const outputDirectoryExists = existsSync(outputDirectory)
    const overwriteFileExists = overwriteFile===""?true:existsSync(overwriteFile)
    let errorArray = []
    if (!photoDirectoryExists) errorArray.push('ERROR - Photo directory file path '+photoDirectory+' does not exist.')
    if (!outputDirectoryExists) errorArray.push('ERROR - Output directory file path '+outputDirectory+' does not exist.')
    if (!overwriteFileExists) errorArray.push('ERROR - Overwrite file '+overwriteFile+' does not exist.')
    return(errorArray.length===0?true:errorArray)
}

module.exports = {
    directoriesAreValid:directoriesAreValid
}