const getImgLens = (input) =>{
    const exifData = input[0]
    const errorArray = input[1]
    const newImgObj = input[2]
    const {exif,file} = exifData
    if (exif.hasOwnProperty('LensModel')){
        newImgObj.imgLens = exif.LensModel
    }else{
        errorArray.push(`ERROR - Image ${file} has no LensModel metadata tag!`)
    }
    return ([exifData,errorArray,newImgObj])
}

module.exports = getImgLens