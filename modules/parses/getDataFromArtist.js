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
const extractArtistData = (Artist,file)=>{
    const dataArray = Artist.split(";")
    let errArr = [];
    let GAL = [];
    let FILTERS = [];
    let EXP = [];
    dataArray.forEach((data,index)=>{
        const nextItem = index===dataArray.length-1?undefined:dataArray[index+1]
        switch (data){
            case "GAL":
                if (nextItem===undefined||nextItem.includes("EXP")||nextItem.includes("FILTERS")||nextItem.trim().length===0){ 
                    errArr.push(`WARNING - ${file} has a GAL tag in Artist but no data.`)
                }else{
                    GAL = nextItem.split(",")
                }
                break;
            case "EXP":
                if (nextItem===undefined||nextItem.includes("GAL")||nextItem.includes("FILTERS")||nextItem.trim().length===0){ 
                    errArr.push(`WARNING - ${file} has a EXP tag in Artist but no data.`)
                }else{
                    EXP = nextItem.split(",")
                }
                break;
            case "FILTERS":
                if ( nextItem===undefined||nextItem.includes("GAL")||nextItem.includes("EXP")||nextItem.trim().length===0){ 
                    errArr.push(`WARNING - ${file} has a FILTERS tag in Artist but no data.`)
                }else{
                    FILTERS = nextItem.split(",")
                }
                break; 
        }
    })
    return([GAL,FILTERS,EXP,errArr])
}
const getDataFromArtist = ([exifData,errorArray,newImgObj])=>{
    const artistExists = artistDataExists(exifData)
    if (artistExists===true) {
        const dataIsValid = dataExistsInArtist(exifData)
        if (dataIsValid===true){
                const {Artist} = exifData.image;
                const{file}=exifData
                const [GAL,FILTERS,EXP,errArr] = extractArtistData(Artist,file)
                newImgObj.gals = GAL;
                newImgObj.imgFilters = FILTERS;
                newImgObj.imgExposures = EXP;
                return ([exifData,errArr,newImgObj])
        }else{
            return([exifData,dataIsValid,newImgObj])  
        }
    }else {
        errorArray.push(`ERROR - File ${exifData.file} does not have an Artist tag!`)
        return([exifData,errorArray,newImgObj])
    }
    
}

module.exports = {
    getDataFromArtist:getDataFromArtist,
    artistDataExists:artistDataExists,
    dataExistsInArtist:dataExistsInArtist,
    extractArtistData:extractArtistData
}