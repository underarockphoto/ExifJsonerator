const {ExifImage} = require('exif');
// const fs = require("fs");
// const readline = require('readline');

const imageDirectoryPath = "../../Website/website/photos/web/testJSON"
// const jsonDirectoryPath = "../../Website/website/photos/web"

// const imageDirectoryPathExists = fs.existsSync(imageDirectoryPath)
// const jsonDirectoryPathExists = fs.existsSync(jsonDirectoryPath)

// console.clear()

// process.stdout.write("\n\nExif JSONerator v0.1")
// process.stdout.write("\n------------------------------------")
// process.stdout.write("\n\nChecking File Paths")

// const checkFilePaths = ()=>{
//     return new Promise((resolve,reject)=>{
//         if (imageDirectoryPathExists){
//             process.stdout.write("\nImage directory path exists: "+imageDirectoryPath)
//             if(jsonDirectoryPathExists){
//                 process.stdout.write("\njson directory path exists: "+jsonDirectoryPath)
//                 return resolve()
//             }else{
//             process.stdout.write("\n\nERROR - JSON directory path does not exist:"+jsonDirectoryPath)
//             process.stdout.write("\nExifJSONerator ABORTED")
//             return reject()
//             }
//         }else{
//             process.stdout.write("\n\nERROR - Image directory path does not exist:"+imageDirectoryPath)
//             process.stdout.write("\nExifJSONerator ABORTED")
//             return reject()
//         }
//     })
// }

// const getFilesInPathName = ()=>{ 
//     return new Promise((resolve,reject)=>{
//                             const filePath = imageDirectoryPath
//                             return fs.readdir(filePath,(err,filenames)=>err!=null?reject(err):resolve(filenames))
//                             })}

// const howManyJPG = (array)=>{
//     process.stdout.write("\n\nImage directory contains "+array.length.toString()+" files.")
//     return new Promise((resolve,reject)=>{
//         let numJPG = 0
//         let filteredArray = []
//         array.forEach((file)=>{
//             const adder = file.includes(".jpg")||file.includes(".JPG")?1:0
//             numJPG = numJPG+adder;
//             filteredArray.push(file)
//         })
//         if (numJPG===0){
//             process.stdout.write("\n\nERROR - Image directory contains no JPEGS")
//             process.stdout.write("\nExifJSONerator ABORTED")
//             return reject()
//         }else{
//             process.stdout.write("\n\nImage directory contains "+numJPG.toString()+" JPEGs.")
//             return resolve(filteredArray)
//         }
//     })
// }

// const generateJSONstring = (fileArray)=>{
//     let jsonObject = []
//     return new Promise((resolve)=>{
//         fileArray.forEach((file,index)=>{
//             const filePath = imageDirectoryPath+"/"+file
//             const addNewExif = ()=>{
//                 return new Promise((resolve,reject)=>{
//                     new ExifImage({ image : filePath }, (error, exifData) => {
//                         if (error)
//                         return reject()
//                         else
//                         {   
//                             const exifObject = {shutter:exifData.exif.ExposureTime}
                            
                           
//                             return resolve(exifObject)
//                         }})
//                 })
//             }
//             addNewExif()
//             .then((exifObject)=>{
//                 jsonObject.push(exifObject)
//                 const i = index;
//                 process.stdout.write("\nProcessed file: "+file)
//                 if (i===0) return resolve(jsonObject)
//             })
//             .catch((err)=>console.log("Error while making new Exif object."))
//         })

//     })
// }

// const makeJSONobject = (jsonString)=>{
//     return JSON.stringify(jsonString)
// }

// const writeJSONfile = (jsonString) =>{

//    return new Promise((resolve,reject)=>{
//     fs.writeFile(jsonDirectoryPath+"/exifData.json",jsonString,(err)=>{
//             if(!err) {
//                 process.stdout.write("\n\nExif JSONerator, JOB COMPLETE.")
//                 return resolve()}
//             else return reject("ERROR writing JSON file: ",err)
//         })
//    })
        

// }

// checkFilePaths()
// .then(()=>getFilesInPathName())
// .then((res)=>howManyJPG(res))
// .then((res)=>generateJSONstring(res))
// .then((res)=>makeJSONobject(res))
// .then((res)=>writeJSONfile(res))
// .catch((err)=>process.stdout.write("\n"+err))
const validateEXIFobjects = (exifData)=>{
    return new Promise((resolve,reject)=>{
        if (!exifData.hasOwnProperty('image')) return reject("ERROR: file does not have IMAGE metadata.")
        if (!exifData.hasOwnProperty('exif')) return reject("ERROR: file does not have EXIF metadata.")
        return resolve(exifData)
    })
}
const getImgTitle = (exifData,object) => {
    const {image} = exifData
    return new Promise((resolve,reject)=>{
        if ('ImageID' in image){
            object.imgTitle = image.ImageID;
            return resolve([exifData,object])
        }else{
            return reject("ERROR - File contains no IMAGEID metadata.")
        }
    })
}
function getFormattedDate(dateString){
    const dateData = dateString.split(" ")[0]
    const timeData = dateString.split(" ")[1]
    const formattedDateData = dateData.replaceAll(":","-")
    const formattedDateString = formattedDateData+"T"+timeData
    const dateObj = new Date(formattedDateString)
    return dateObj
}
const getImgDate = (res)=>{
    const exifData = res[0]
    const obj = res[1]
    const {exif} = exifData
    return new Promise((resolve,reject)=>{
        if ('DateTimeOriginal'in exif){
            const dateString = exif.DateTimeOriginal
            const dateObj = getFormattedDate(dateString)
            obj.imgDate = Date.parse(dateObj)
            return resolve([exifData,obj])
        }else return reject("ERROR - File contains no DATE metadata.")
    })
}
const getImgCam = (res)=>{
    const exifData = res[0]
    const obj = res[1]
    const {image} = exifData
    return new Promise((resolve,reject)=>{
        if ('Model'in image){   
            obj.imgCam = image.Model
            return resolve([exifData,obj])
        }else return reject("ERROR - File contains no MODEL metadata.")
    })
}
const getImgLens = (res)=>{
    const exifData = res[0]
    const obj = res[1]
    const {exif} = exifData
    return new Promise((resolve,reject)=>{
        if ('LensModel'in exif){   
            obj.imgLens = exif.LensModel
            return resolve([exifData,obj])
        }else return reject("ERROR - File contains no MODEL metadata.")
    })
}
function formatShutterSpeed(speed){
    const speedNum = Number(speed)
    if (speedNum<1){
        return (Math.trunc(1/speedNum).toString())
    }else return speedNum.toString()
}
const getImgExp = (res)=>{
    const exifData = res[0]
    const obj = res[1]
    const {exif} = exifData
    return new Promise((resolve,reject)=>{
        if (!exif.hasOwnProperty('ExposureTime')) return reject("ERROR - File contains no ExposureTime metadata.")
        else if (!exif.hasOwnProperty('FNumber')) return reject("ERROR - File contains no FNumber metadata.")
        else if (!exif.hasOwnProperty('ISO')) return reject("ERROR - File contains no ISO metadata.")
        else{   
            const shutter = formatShutterSpeed(exif.ExposureTime)+"s"
            const aperture = "f/"+exif.FNumber
            const ISO = "ISO-"+exif.ISO
            obj.imgExp = [shutter, aperture, ISO]
            return resolve([exifData,obj])
        }
    })
}
const buildExifJSON = (exifData)=>{
    let obj = {
        imgTitle:"",imgDesc:"",gals:[],imgSrc:exifData.path,imgDate:"",imgExp:[],imgCam:"",imgLens:"",imgForm:"",imgFilters:"",imgLoc:"",exposures:[],key:""
    }
    return new Promise ((resolve,reject)=>{
        getImgTitle(exifData,obj)
        .then((res)=>getImgDate(res))
        .then((res)=>getImgCam(res))
        .then((res)=>getImgLens(res))
        .then((res)=>getImgExp(res))
        .then((res)=>{return resolve(res)})
        .catch((err)=>{return reject(err)})
    })
    
}
const file = "tontonaturalbridge-202308 (10).jpg"
new ExifImage({ image : imageDirectoryPath+"/"+file }, (error, exifData) => {
    if (error)
    console.log('Error: '+error.message);
    else
    {   
        exifData.path=file
        validateEXIFobjects(exifData)
        .then((exifData)=>buildExifJSON(exifData))
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }})