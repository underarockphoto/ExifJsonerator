const dataExistsInArtist = (data)=>{
    const {image,file}=data
    const {Artist}=image
    let errArr = []
    if (!Artist.includes("GAL;")) errArr.push(`ERROR - File ${file} Artist tag does not contain GAL data!`)
    if (!Artist.includes("EXP;")) errArr.push(`ERROR - File ${file} Artist tag does not contain EXP data!`)
    if (!Artist.includes("FILTERS;")) errArr.push(`ERROR - File ${file} Artist tag does not contain FILTERS data!`)
    if(errArr===undefined||errArr.length===0) errArr = true;
    return errArr
}
const artistDataExists = (exifData)=>{
    return exifData.image.hasOwnProperty('Artist')
}
const getDataFromArtist = ([exifData,errorArray,newImgObj])=>{
    const artistExists = artistDataExists(exifData)
    if (artistExists===true) {
        const dataIsValid = dataExistsInArtist(exifData)
        if (dataIsValid===true){

        }else{
            errorArray.push(dataIsValid)
            return([exifData,errorArray,newImgObj])  
        }
    }else {
        errorArray.push(`ERROR - File ${exifData.file} does not have an Artist tag!`)
        return([exifData,errorArray,newImgObj])
    }
    
}

module.exports = {
    getDataFromArtist:getDataFromArtist,
    artistDataExists:artistDataExists,
    dataExistsInArtist:dataExistsInArtist
}