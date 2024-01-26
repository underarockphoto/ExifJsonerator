const fs = require('fs')
const {readdirSync}=fs

const getArrayOfFiles = (filepath) =>{
    const allFiles = readdirSync(filepath)
    if (allFiles.length===0) return("ERROR - No files exist in filepath: "+filepath)
    let numJPG = 0;
    let filteredFiles = [];
    allFiles.forEach(file=>{
        if (file.includes(".jpg")||file.includes(".JPG")){
            numJPG = numJPG+1;
            filteredFiles.push(file)
        }
    })
    if (numJPG === 0) return ("ERROR - No JPEGs exist in filepath: "+filepath)
    console.log("Found "+allFiles.length+" files in directory of which "+numJPG+" are JPEGs.")
    return(filteredFiles)
}

module.exports = {
    getArrayOfFiles:getArrayOfFiles,
}