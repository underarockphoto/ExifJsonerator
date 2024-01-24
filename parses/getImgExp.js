const hasExpProps = (exif,file)=>{
    let errArr = []
    if (!exif.hasOwnProperty("FNumber")) errArr.push(`ERROR - File ${file} is missing FNUMBER metadata.`)
    if (!exif.hasOwnProperty("ISO")) errArr.push(`ERROR - File ${file} is missing ISO metadata.`)
    if (!exif.hasOwnProperty("ExposureTime")) errArr.push(`ERROR - File ${file} is missing ExposureTime metadata.`)
    if (errArr === undefined || errArr.length == 0) errArr = true;
    return errArr
}

const getShutterSpeed = (exif) =>{
    const rawShutter = Number(exif.ExposureTime);
    if (rawShutter<1) return ("1/"+Math.trunc(1/rawShutter).toString()+"s")
    else return rawShutter.toString()+"s"
}
const getFNumber = (exif)=>{
    return "f/"+exif.FNumber.toString()
}
const getISO = (exif)=>{
    return "ISO-"+exif.ISO.toString();
}

const getImgExp = (input) =>{
    const exifData = input[0]
    const errorArray = input[1]
    const newImgObj = input[2]
    const {exif,file} = exifData
    
    const propsExist = hasExpProps(exif,file)
    if (propsExist===true){
        const shutterSpeed = getShutterSpeed(exif)
        const aperture = getFNumber(exif)
        const ISO = getISO(exif)
        newImgObj.imgExp = [shutterSpeed,aperture,ISO]
    }else{
        propsExist.forEach((err)=>errorArray.push(err))
    }
    return ([exifData,errorArray,newImgObj])
}

module.exports = {
    hasExpProps:hasExpProps,
    getImgExp:getImgExp,
    getShutterSpeed:getShutterSpeed,
    getFNumber:getFNumber,
    getISO:getISO
}