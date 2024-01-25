const getTitle = (input) =>{
        const exifData = input[0]
        const errorArray = input[1]
        const newImgObj = input[2]
        const {image,file} = exifData
        if (image.hasOwnProperty('ImageID')){
            newImgObj.imgTitle = image.ImageID
        }else{
            errorArray.push(`ERROR - Image ${file} has no ImageID metadata tag!`)
        }
        return ([exifData,errorArray,newImgObj])
}

module.exports = getTitle