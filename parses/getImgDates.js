const getImgDates = (input) =>{
        const exifData = input[0]
        let errorArray = input[1]
        const newImgObj = input[2]
        const {image,exif,file} = exifData
        let hasErrors = false;
        
        if (!image.hasOwnProperty('ModifyDate')){
            errorArray.push(`ERROR - Image ${file} has no ModifyDate metadata tag!`)
            hasErrors = true;
        }
        if(!exif.hasOwnProperty('DateTimeOriginal')){
            errorArray.push(`ERROR - Image ${file} has no OriginalDate metadata tag!`)
            hasErrors = true;
        }
        if(!hasErrors){
            const {ModifyDate} = image;
            const {DateTimeOriginal} = exif
        }
        return ([exifData,errorArray,newImgObj])
}

module.exports = getImgDates