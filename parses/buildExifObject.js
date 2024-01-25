const {getImgExp} = require('./getImgExp')
const {getDataFromArtist} = require('./getDataFromArtist')
const {getDataFromImageDesc} = require('./getDataFromImageDesc')
const getTitle = require('./getTitle')
const getImgCam = require('./getImgCam')
const getImgDates = require('./getImgDates')
const getImgLens = require('./getImgLens')
const getImgSrc = require('./getImgSrc')


const buildExifObject = (exifData)=>{
let newImgObj = {};
let errorArr = [];
let errorArray = []
errorArr=(getImgSrc([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getTitle([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getImgCam([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getImgLens([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getImgDates([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getImgExp([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getDataFromArtist([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
errorArr=(getDataFromImageDesc([exifData,[],newImgObj])[1])
errorArr.forEach(err=>errorArray.push(err))
return([newImgObj,errorArray])

}

module.exports = buildExifObject