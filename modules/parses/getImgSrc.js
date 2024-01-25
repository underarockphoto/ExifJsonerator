const getImgSrc = (input) =>{
    const exifData = input[0]
    const errorArray = input[1]
    const newImgObj = input[2]
    if (exifData.hasOwnProperty('file')){
        newImgObj.imgSrc = exifData.file
    }else{
        errorArray.push(`ERROR - Image UNDEFINED has no FILE!`)
    }
    return ([exifData,errorArray,newImgObj])
}

module.exports = getImgSrc