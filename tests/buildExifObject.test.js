const buildExifObject = require("../parses/buildExifObject")
const exampleDataNoArtistOrImgDesc = require('./exampleObjects/exampleExifNoArtistOrImgDesc.json')
const exampleDataNoDatesAtAll = require('./exampleObjects/exampleExifHasNoDatesAtAll.json')
const exampleDataNoExposure = require('./exampleObjects/exampleExifHasNoExposure.json')
const exampleDataGood = require('./exampleObjects/exampleExifOutput.json')
const goodObject = {
    imgSrc: 'exampleImage.jpg',
    imgTitle: 'Yay, we got the right title!',
    imgCam: 'Canon EOS 5D Mark IV',
    imgLens: 'EF24-105mm f/4L IS USM',
    imgMod: 1704829210000,
    imgDate: 1690850403000,
    imgExp: [ '4s', 'f/9', 'ISO-100' ],
    gals: [ 'Animals', 'Snakes', 'Arizona' ],
    imgFilters: [ 'ND4', 'CPL' ],
    imgExposures: [ '1', '1', '1' ],
    imgForm: 'Canon Digital RAW',
    imgLoc: 'Tonto Natural Bridge, Gila County, Arizona',
    imgDesc: 'Black Maidenhair Fern (<i>Adiantum capillus-veneris</i>) around the waterfall.'
  }
test('Data missing the Artist and Image Description tags should return errors and an incomplete object',()=>{
    const errorArray = [
        'ERROR - File exampleImage.jpg does not have an Artist tag!',
        'ERROR - File exampleImage.jpg does not have an Image Description tag!'
      ]
    const badObject = {
        imgSrc: 'exampleImage.jpg',
        imgTitle: 'Yay, we got the right title!',
        imgCam: 'Canon EOS 5D Mark IV',
        imgLens: 'EF24-105mm f/4L IS USM',
        imgMod: 1704829210000,
        imgDate: 1690850403000,
        imgExp: [ '4s', 'f/9', 'ISO-100' ]
      }
      expect(buildExifObject(exampleDataNoArtistOrImgDesc)).toStrictEqual([badObject,errorArray])
})
test('Good complete data will result is a good and complete object',()=>{
    const errorArray = []

      expect(buildExifObject(exampleDataGood)).toStrictEqual([goodObject,errorArray])
})
test('Data missing the Original and Modify Date tags should return errors.  The lack of GAL, EXP, and FILTERS will return warnings and an incomplete object',()=>{
    const errorArray = [
        'ERROR - Image exampleImage.jpg has no ModifyDate metadata tag!',
        'ERROR - Image exampleImage.jpg has no OriginalDate metadata tag!',
        'WARNING - exampleImage.jpg has a GAL tag in Artist but no data.',
        'WARNING - exampleImage.jpg has a EXP tag in Artist but no data.',
        'WARNING - exampleImage.jpg has a FILTERS tag in Artist but no data.'
      ]
    const badObject ={
        imgSrc: 'exampleImage.jpg',
        imgTitle: 'Yay, we got the right title!',
        imgCam: 'Canon EOS 5D Mark IV',
        imgLens: 'EF24-105mm f/4L IS USM',
        imgExp: [ '4s', 'f/9', 'ISO-100' ],
        gals: [],
        imgFilters: [],
        imgExposures: [],
        imgForm: 'Canon Digital RAW',
        imgLoc: 'Tonto Natural Bridge, Gila County, Arizona',
        imgDesc: 'Black Maidenhair Fern (<i>Adiantum capillus-veneris</i>) around the waterfall.'
      }
      expect(buildExifObject(exampleDataNoDatesAtAll)).toStrictEqual([badObject,errorArray])
})
test('Data missing the Model, Lens Model, ISO, FNUMBER, and ExposureTime tags should return errors.  The lack of GAL, EXP, and FILTERS will return warnings and an incomplete object',()=>{
    const errorArray = [
        'ERROR - Image exampleImageWithNoExposure.jpg has no Model metadata tag!',
  'ERROR - Image exampleImageWithNoExposure.jpg has no LensModel metadata tag!',
  'ERROR - File exampleImageWithNoExposure.jpg is missing FNUMBER metadata.',
  'ERROR - File exampleImageWithNoExposure.jpg is missing ISO metadata.',
  'ERROR - File exampleImageWithNoExposure.jpg is missing ExposureTime metadata.',
  'WARNING - exampleImageWithNoExposure.jpg has a GAL tag in Artist but no data.',
  'WARNING - exampleImageWithNoExposure.jpg has a EXP tag in Artist but no data.',
  'WARNING - exampleImageWithNoExposure.jpg has a FILTERS tag in Artist but no data.'
      ]
    const badObject ={
        imgSrc: 'exampleImageWithNoExposure.jpg',
        imgTitle: 'Yay, we got the right title!',
        imgMod: 1704829210000,
        imgDate: 1690850403000,
        gals: [],
        imgFilters: [],
        imgExposures: [],
        imgForm: 'Canon Digital RAW',
        imgLoc: 'Tonto Natural Bridge, Gila County, Arizona',
        imgDesc: 'Black Maidenhair Fern (<i>Adiantum capillus-veneris</i>) around the waterfall.'
      }
      expect(buildExifObject(exampleDataNoExposure)).toStrictEqual([badObject,errorArray])
})