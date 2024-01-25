const getImgCam = (input) =>{
    const exifData = input[0]
    const errorArray = input[1]
    const newImgObj = input[2]
    const {image,file} = exifData
    if (image.hasOwnProperty('Model')){
        newImgObj.imgCam = image.Model
    }else{
        errorArray.push(`ERROR - Image ${file} has no Model metadata tag!`)
    }
    return ([exifData,errorArray,newImgObj])
}

module.exports = getImgCam