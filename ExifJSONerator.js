const {ExifImage} = require('exif');
const fs = require("fs");
const readline = require('readline');

const imageDirectoryPath = "../../Website/website/photos/web"
const jsonDirectoryPath = "../../Website/website/photos/web"

const imageDirectoryPathExists = fs.existsSync(imageDirectoryPath)
const jsonDirectoryPathExists = fs.existsSync(jsonDirectoryPath)
let errorArray = []
console.clear()

process.stdout.write("\n\nExif JSONerator v0.1")
process.stdout.write("\n------------------------------------")
process.stdout.write("\n\nChecking File Paths")

const checkFilePaths = ()=>{
    return new Promise((resolve,reject)=>{
        if (imageDirectoryPathExists){
            process.stdout.write("\nImage directory path exists: "+imageDirectoryPath)
            if(jsonDirectoryPathExists){
                process.stdout.write("\njson directory path exists: "+jsonDirectoryPath)
                return resolve()
            }else{
            process.stdout.write("\n\nERROR - JSON directory path does not exist:"+jsonDirectoryPath)
            process.stdout.write("\nExifJSONerator ABORTED")
            return reject()
            }
        }else{
            process.stdout.write("\n\nERROR - Image directory path does not exist:"+imageDirectoryPath)
            process.stdout.write("\nExifJSONerator ABORTED")
            return reject()
        }
    })
}

const getFilesInPathName = ()=>{ 
    return new Promise((resolve,reject)=>{
                            const filePath = imageDirectoryPath
                            return fs.readdir(filePath,(err,filenames)=>err!=null?reject(err):resolve(filenames))
                            })}

const howManyJPG = (array)=>{
    process.stdout.write("\n\nImage directory contains "+array.length.toString()+" files.")
    return new Promise((resolve,reject)=>{
        let numJPG = 0
        let filteredArray = []
        array.forEach((file)=>{
            const adder = file.includes(".jpg")||file.includes(".JPG")?1:0
            numJPG = numJPG+adder;
            filteredArray.push(file)
        })
        if (numJPG===0){
            process.stdout.write("\n\nERROR - Image directory contains no JPEGS")
            process.stdout.write("\nExifJSONerator ABORTED")
            return reject()
        }else{
            process.stdout.write("\n\nImage directory contains "+numJPG.toString()+" JPEGs.")
            return resolve(filteredArray)
        }
    })
}

const validateEXIFobjects = (exifData)=>{
    return new Promise((resolve,reject)=>{
        if (!exifData.hasOwnProperty('image')) errorArray.push("\nERROR: file "+exifData.path+" does not have IMAGE metadata.")
        if (!exifData.hasOwnProperty('exif')) errorArray.push("\nERROR: file "+exifData.path+" does not have EXIF metadata.")
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
            errorArray.push("\nERROR - File "+exifData.path+" contains no IMAGEID metadata.")
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
        }else errorArray.push("\nERROR - File "+exifData.path+" contains no DATE metadata.")
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
        }else errorArray.push("\nERROR - File "+exifData.path+" contains no MODEL metadata.")
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
        }else errorArray.push("\nERROR - File "+exifData.path+" contains no MODEL metadata.")
    })
}
function formatShutterSpeed(speed){
    const speedNum = Number(speed)
    if (speedNum<1){
        return ("1/"+Math.trunc(1/speedNum).toString())
    }else return speedNum.toString()
}
const getImgExp = (res)=>{
    const exifData = res[0]
    const obj = res[1]
    const {exif} = exifData
    return new Promise((resolve,reject)=>{
        if (!exif.hasOwnProperty('ExposureTime')) errorArray.push("\nERROR - File "+exifData.path+" contains no ExposureTime metadata.")
        else if (!exif.hasOwnProperty('FNumber')) errorArray.push("\nERROR - File "+exifData.path+" contains no FNumber metadata.")
        else if (!exif.hasOwnProperty('ISO')) errorArray.push("\nERROR - File "+exifData.path+" contains no ISO metadata.")
        else{   
            const shutter = formatShutterSpeed(exif.ExposureTime)+"s"
            const aperture = "f/"+exif.FNumber
            const ISO = "ISO-"+exif.ISO
            obj.imgExp = [shutter, aperture, ISO]
            return resolve([exifData,obj])
        }
    })
}

const getImgDescGalsFormLocFiltersExp = (res)=>{
    const exifData = res[0]
    const obj = res[1]
    const {image} = exifData
    return new Promise((resolve,reject)=>{
        if (!image.hasOwnProperty('ImageDescription')) errorArray.push("\nERROR - File contains "+exifData.path+" no ImageDescription metadata.")
        else if (!image.hasOwnProperty('Artist')) errorArray.push("\nERROR - File "+exifData.path+" contains no Artist metadata.")
        else{
            if (!image.ImageDescription.includes("FORM")) errorArray.push("\nERROR - Image "+exifData.path+" description contains no FORM metadata.")
            else if (!image.ImageDescription.includes("DESC")) errorArray.push("\nERROR - Image description "+exifData.path+" contains no DESC metadata.")
            else if (!image.ImageDescription.includes("LOC")) errorArray.push("\nERROR - Image description "+exifData.path+" contains no LOC metadata.")
            else if (!image.Artist.includes("GAL")) errorArray.push("\nERROR - Artist "+exifData.path+" contains no GAL metadata.")
            else if (!image.Artist.includes("EXP")) errorArray.push("\nERROR - Artist "+exifData.path+" contains no EXP metadata.")
            else if (!image.Artist.includes("FILTERS")) errorArray.push("\nERROR - Artist "+exifData.path+" contains no FILTERS metadata.")
        else{
            const arrayID = Array.from(image.ImageDescription.split(";"))
            const arrayArtist = Array.from(image.Artist.split(";"))
           
            arrayID.forEach((label,index)=>{
                
                switch (label){
                    case "FORM": 
                        const format = arrayID[index+1];
                        obj.imgForm = format; 
                        break;
                    case "DESC": 
                    const desc = arrayID[index+1]
                    obj.imgDesc = desc; 
                    break;
                    case "LOC": 
                    const loc = arrayID[index+1];
                    obj.imgLoc = loc;  break;
                    default: break;
                }
            })
            arrayArtist.forEach((label,index)=>{
                switch (label){
                    case "GAL": obj.gals = Array.from(arrayID[index+1].split(",")); break;
                    case "EXP": obj.imgExp = arrayID[index+1]; break;
                    case "FILTERS": obj.imgFilters =  Array.from(arrayID[index+1].split(",")); break;
                }
            })
            return resolve([exifData,obj])
        }
        }
    })
}
const buildExifJSON = (exifData)=>{
    let obj = {
        imgTitle:"",imgDesc:"",gals:[],imgSrc:exifData.path,imgDate:"",imgExp:[],imgCam:"",imgLens:"",imgForm:"",imgFilters:"",imgLoc:"",exposures:[],key:exifData.key
    }
    return new Promise ((resolve,reject)=>{
        getImgTitle(exifData,obj)
        .then((res)=>getImgDate(res))
        .then((res)=>getImgCam(res))
        .then((res)=>getImgLens(res))
        .then((res)=>getImgExp(res))
        .then((res)=>getImgDescGalsFormLocFiltersExp(res))
        .then((res)=>{return resolve(res)})
        .catch((err)=>{return reject(err)})
    })
    
}

const generateJSONstring = (fileArray)=>{
    let jsonObject = []
    let filteredArray = []
    fileArray.forEach((file)=>{
        if (file.includes(".jpg")||file.includes(".JPG")) filteredArray.push(file)
    })
    return new Promise((resolve,reject)=>{
        for (let i=0;i<filteredArray.length;i++){
            const file = filteredArray[i]
            const index=i;
            const filePath = imageDirectoryPath+"/"+file
            const getNewExif = ()=>{
                return new Promise((res,rej)=>{
                    process.stdout.write(`\nProcessing file ${index+1} of ${filteredArray.length}: ${file}`)
                    new ExifImage({ image : filePath }, (error, exifData) => {
                        if (error)
                        return rej()
                        else
                        {   
                            const exifObject = exifData
                            exifObject.path=file
                            exifObject.key=index
                            return res(exifObject)
                        }})
                })
            }
            getNewExif()    
            .then((exifData)=>validateEXIFobjects(exifData))
            .then((exifData)=>buildExifJSON(exifData))
            .then((res)=>{
                jsonObject.push(res[1])
                if (jsonObject.length===filteredArray.length) return resolve(jsonObject) 
            })
            .catch((err)=>{reject(err)})
        }

    })
}

const sortJSONbyKey = (jsonObject)=>{

    return new Promise((resolve,reject)=>{
        
        let sortedJson = [];
        for (i=0;i<jsonObject.length;i++){
            const keyEntry = (jsonObject.find(o=>o.key===i))
            const originalIndex = jsonObject.findIndex(p=>p.key===i)
            sortedJson.push(keyEntry)
            process.stdout.write(`\nSorting object number ${i} from object number ${originalIndex}`)
        }

        for (i=0;i<sortedJson.length;i++){
            if (i!==sortedJson[i].key) return reject("Error in sorting")
        }
        return resolve(JSON.stringify(sortedJson))
    })
}

const writeJSONfile = (jsonString) =>{

   return new Promise((resolve,reject)=>{
    fs.writeFile(jsonDirectoryPath+"/exifData.json",jsonString,(err)=>{
            if(!err) {
                process.stdout.write("\n\nJSON file created...")
                return resolve()}
            else return reject("ERROR writing JSON file: ",err)
        })
   })
        

}
const displayErrors=()=>{
    process.stdout.write("\n\n\x1b[31mProcessing stopped with "+errorArray.length+" errors:\n")
    errorArray.forEach((error)=>{
        const formattedError = error.replace("ERROR","\x1b[31mERROR\x1b[37m")
        process.stdout.write(formattedError)
    })
}
checkFilePaths()
.then(()=>getFilesInPathName())
.then((res)=>howManyJPG(res))
.then((res)=>generateJSONstring(res))
.then((res)=>sortJSONbyKey(res))
.then((res)=>writeJSONfile(res))
.catch((err)=>displayErrors())
