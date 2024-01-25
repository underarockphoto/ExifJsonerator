//ImageID: "DESC;<description>;FORM;<imageFormat>;LOC;<location string>"
const dataExistsInImgDesc = (data)=>{
    const {image,file}=data
    const {ImageDescription}=image
    let errArr = []
    if (!ImageDescription.includes("LOC;")) errArr.push(`ERROR - File ${file} ImageDescription tag does not contain LOC data!`)
    if (!ImageDescription.includes("FORM;")) errArr.push(`ERROR - File ${file} ImageDescription tag does not contain FORM data!`)
    if (!ImageDescription.includes("DESC;")) errArr.push(`ERROR - File ${file} ImageDescription tag does not contain DESC data!`)
    if(errArr===undefined||errArr.length===0) errArr = true;
    return errArr
}
const imageDescriptionDataExists = (exifData)=>{
    return exifData.image.hasOwnProperty('ImageDescription')
}
const extractImageDescriptionData = (ImageDescription,file)=>{
    const dataArray = ImageDescription.split(";")
    let errArr = [];
    let FORM = "";
    let LOC = "";
    let DESC = "";
    dataArray.forEach((data,index)=>{
        const nextItem = index===dataArray.length-1?undefined:dataArray[index+1]
        switch (data){
            case "FORM":
                if (nextItem===undefined||nextItem.includes("DESC")||nextItem.includes("LOC")||nextItem.trim().length===0){ 
                    errArr.push(`WARNING - ${file} has a FORM tag in ImageDescription but no data.`)
                }else{
                    FORM = nextItem
                }
                break;
            case "DESC":
                if (nextItem===undefined||nextItem.includes("FORM")||nextItem.includes("LOC")||nextItem.trim().length===0){ 
                    errArr.push(`WARNING - ${file} has a DESC tag in ImageDescription but no data.`)
                }else{
                    DESC = nextItem
                }
                break;
            case "LOC":
                if (nextItem===undefined||nextItem.includes("FORM")||nextItem.includes("DESC")||nextItem.trim().length===0){ 
                    errArr.push(`WARNING - ${file} has a LOC tag in ImageDescription but no data.`)
                }else{
                    LOC = nextItem
                }
                break; 
        }
    })
    return([FORM,LOC,DESC,errArr])
}
const getDataFromImageDesc = ([exifData,errorArray,newImgObj])=>{
    const imageDescriptionExists = imageDescriptionDataExists(exifData)
    if (imageDescriptionExists===true) {
        const dataIsValid = dataExistsInImgDesc(exifData)
        if (dataIsValid===true){
                const {ImageDescription} = exifData.image;
                const [FORM,LOC,DESC,errArr] = extractImageDescriptionData(ImageDescription)
                newImgObj.imgForm = FORM;
                newImgObj.imgLoc = LOC;
                newImgObj.imgDesc = DESC;
                
                return ([exifData,errArr,newImgObj])
        }else{
            return([exifData,dataIsValid,newImgObj])  
        }
    }else {
        errorArray.push(`ERROR - File ${exifData.file} does not have an Image Description tag!`)
        return([exifData,errorArray,newImgObj])
    }
    
}
module.exports = {
    dataExistsInImgDesc:dataExistsInImgDesc,
    imageDescriptionDataExists:imageDescriptionDataExists,
    extractImageDescriptionData:extractImageDescriptionData,
    getDataFromImageDesc:getDataFromImageDesc
}
