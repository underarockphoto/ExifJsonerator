const {ExifImage} = require ('exif')

const getExifDataObject = (photoInputDirectory,file)=>{
    return new Promise((resolve,reject)=>{
         new ExifImage({ image : photoInputDirectory+"/"+file }, (error, exifData) => {
                if (error) return reject(error.toString())
                else {
                    exifData.file=file;
                    if (exifData.hasOwnProperty('exif')&&exifData.exif.hasOwnProperty('ExifVersion')) delete exifData.exif.ExifVersion
                    return resolve(exifData)
                }
    })
 })
}

const getArrayOfExifData = (fileArray,photoInputDirectory)=>{
    let errArry = [];
    let exifArr = [];
    let completedJobs = 0;
    return new Promise((resolve)=>{
        fileArray.forEach((file)=>{
            getExifDataObject(photoInputDirectory,file)
            .then((res)=>exifArr.push(res))
            .catch((err)=>errArry.push(err))
            .finally(()=>{
                completedJobs = completedJobs+1
                if (completedJobs===fileArray.length) return resolve([exifArr,errArry])
            })
        })
    })
}


module.exports = {getExifDataObject:getExifDataObject,getArrayOfExifData:getArrayOfExifData}

      
   
