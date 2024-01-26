const {Buffer}=require('node:buffer')
const {getExifDataObject,getArrayOfExifData} = require('../modules/getExifData')
const goodFilePath = './tests/testPhotos'
const goodFile = 'examplePhoto (1).jpg'
const goodOutput = {
    file:goodFile,
    image: {
    ImageWidth: 3360,
    ImageHeight: 2240,
    BitsPerSample: [ 8, 8, 8 ],
    PhotometricInterpretation: 2,
    Orientation: 1,
    SamplesPerPixel: 3,
    XResolution: 72,
    YResolution: 72,
    ResolutionUnit: 2,
    Software: 'Adobe Photoshop 23.5 (Windows)',
    ModifyDate: '2023:08:30 00:18:57',
    ExifOffset: 232
  },
  thumbnail: {
    Compression: 6,
    XResolution: 72,
    YResolution: 72,
    ResolutionUnit: 2,
    ThumbnailOffset: 382,
    ThumbnailLength: 4059
  },
  exif: {
    ColorSpace: 1,
    ExifImageWidth: 3000,
    ExifImageHeight: 2000
  },
  gps: {},
  interoperability: {},
  makernote: {}
}
const goodFileArray = ['examplePhoto (1).jpg',
                       'examplePhoto (2).jpg',
                       'examplePhoto (3).jpg',
                       'examplePhoto (4).jpg']
const goodOutput1 = goodOutput
const goodOutput2 = {
    file:goodFileArray[1],
    image: {
      ImageDescription: 'FORM;Canon Digital RAW;DESC;Black Maidenhair Fern (<i>Adiantum capillus-veneris</i>) around the waterfall.;LOC;Tonto Natural Bridge, Gila County, Arizona;',
      Make: 'Canon',
      Model: 'Canon EOS 5D Mark IV',
      XResolution: 240,
      YResolution: 240,
      ResolutionUnit: 2,
      Software: 'Adobe Photoshop Lightroom Classic 12.0.1 (Windows)',
      ModifyDate: '2024:01:09 14:40:10',
      Artist: 'GAL; ;EXP; ;FILTERS; ;',
      ImageID: 'Black Maidenhair Fern (<i>Adiantum capillus-veneris</i>) around the waterfall.',
      Copyright: '2023 Ryan R. Maurer',
      ExifOffset: 548
    },
    thumbnail: {
      Compression: 6,
      XResolution: 72,
      YResolution: 72,
      ResolutionUnit: 2,
      ThumbnailOffset: 1262,
      ThumbnailLength: 9149
    },
    exif: {
      ExposureTime: 4,
      FNumber: 9,
      ExposureProgram: 1,
      ISO: 100,
      SensitivityType: 2,
      RecommendedExposureIndex: 100,
      DateTimeOriginal: '2023:07:31 20:40:03',
      CreateDate: '2024:01:23 14:40:03',
      ShutterSpeedValue: -2,
      ApertureValue: 6.33985,
      ExposureCompensation: 0,
      MaxApertureValue: 4,
      MeteringMode: 5,
      Flash: 16,
      FocalLength: 55,
      SubSecTimeOriginal: '58',
      SubSecTimeDigitized: '58',
      ColorSpace: 1,
      FocalPlaneXResolution: 1866.6666564941406,
      FocalPlaneYResolution: 1866.6666564941406,
      FocalPlaneResolutionUnit: 3,
      CustomRendered: 0,
      ExposureMode: 1,
      WhiteBalance: 1,
      SceneCaptureType: 0,
      SerialNumber: '652039001499',
      LensInfo: [ 24, 105, NaN, NaN ],
      LensModel: 'EF24-105mm f/4L IS USM',
      LensSerialNumber: '0000188c4f'
    },
    gps: {},
    interoperability: {},
    makernote: {}
  }
const goodOutput3 = {
    file:goodFileArray[2],
    image: {
      ImageDescription: 'DESC;brown phased Arizona Black Rattlesnake (<i>Crotalus cerberus</i>).;LOC;Tonto Natural Bridge, Gila County, Arizona;FORM;Canon Digital RAW;',
      Make: 'Canon',
      Model: 'Canon EOS 5D Mark IV',
      XResolution: 240,
      YResolution: 240,
      ResolutionUnit: 2,
      Software: 'Adobe Photoshop Lightroom Classic 12.0.1 (Windows)',
      ModifyDate: '2023:11:21 15:01:16',
      Artist: 'GAL;;FILTERS;;EXP;;',
      ImageID: 'brown phased Arizona Black Rattlesnake (<i>Crotalus cerberus</i>)',
      Copyright: '2023 Ryan Maurer',
      ExifOffset: 518
    },
    thumbnail: {
      Compression: 6,
      XResolution: 72,
      YResolution: 72,
      ResolutionUnit: 2,
      ThumbnailOffset: 1238,
      ThumbnailLength: 8079
    },
    exif: {
      ExposureTime: 0.125,
      FNumber: 6.3,
      ExposureProgram: 1,
      ISO: 640,
      SensitivityType: 2,
      RecommendedExposureIndex: 640,
      DateTimeOriginal: '2023:08:07 01:06:05',
      CreateDate: '2023:08:07 01:06:05',
      ShutterSpeedValue: 3,
      ApertureValue: 5.310704,
      ExposureCompensation: 0,
      MaxApertureValue: 4.625,
      MeteringMode: 5,
      Flash: 9,
      FocalLength: 200,
      SubSecTimeOriginal: '00',
      SubSecTimeDigitized: '00',
      ColorSpace: 1,
      FocalPlaneXResolution: 1866.6666564941406,
      FocalPlaneYResolution: 1866.6666564941406,
      FocalPlaneResolutionUnit: 3,
      CustomRendered: 0,
      ExposureMode: 1,
      WhiteBalance: 1,
      SceneCaptureType: 0,
      SerialNumber: '652039001499',
      LensInfo: [ 100, 400, NaN, NaN ],
      LensModel: 'EF100-400mm f/4.5-5.6L IS USM',
      LensSerialNumber: '0000000000'
    },
    gps: {},
    interoperability: {},
    makernote: {}
  }
const goodOutput4 = {
    file:goodFileArray[3],
    image: {
      ImageDescription: 'DESC;white-nosed coati (<i>Nasua narica</i>).;FORM;Canon Digital RAW;LOC;Pine Creek Gorge, Tonto Natural Bridge, Gila County, Arizona;',
      Make: 'Canon',
      Model: 'Canon EOS 5D Mark IV',
      XResolution: 240,
      YResolution: 240,
      ResolutionUnit: 2,
      Software: 'Adobe Photoshop Lightroom Classic 12.0.1 (Windows)',
      ModifyDate: '2023:11:22 04:46:39',
      Artist: 'GAL;Animals;FILTERS;;EXP;;',
      ImageID: 'white-nosed coati (<i>Nasua narica</i>)',
      Copyright: '2023 Ryan Maurer',
      ExifOffset: 490
    },
    thumbnail: {
      Compression: 6,
      XResolution: 72,
      YResolution: 72,
      ResolutionUnit: 2,
      ThumbnailOffset: 1204,
      ThumbnailLength: 10355
    },
    exif: {
      ExposureTime: 0.005,
      FNumber: 5,
      ExposureProgram: 2,
      ISO: 500,
      SensitivityType: 2,
      RecommendedExposureIndex: 500,
      DateTimeOriginal: '2023:07:31 10:30:13',
      CreateDate: '2023:07:31 10:30:13',
      ShutterSpeedValue: 7.643856,
      ApertureValue: 4.643856,
      ExposureCompensation: -0.3333333333333333,
      MaxApertureValue: 4,
      MeteringMode: 5,
      Flash: 16,
      FocalLength: 105,
      SubSecTimeOriginal: '00',
      SubSecTimeDigitized: '00',
      ColorSpace: 1,
      FocalPlaneXResolution: 1866.6666564941406,
      FocalPlaneYResolution: 1866.6666564941406,
      FocalPlaneResolutionUnit: 3,
      CustomRendered: 0,
      ExposureMode: 0,
      WhiteBalance: 1,
      SceneCaptureType: 0,
      SerialNumber: '652039001499',
      LensInfo: [ 24, 105, NaN, NaN ],
      LensModel: 'EF24-105mm f/4L IS USM',
      LensSerialNumber: '0000188c4f'
    },
    gps: {},
    interoperability: {},
    makernote: {}
  }

test('Return a valid exifData object',()=>{
getExifDataObject(goodFilePath,goodFile).then((output)=>expect(output).toStrictEqual(goodOutput))
})
test('Return a valid exifData array',()=>{
    getArrayOfExifData(goodFileArray,goodFilePath)
    .then((output)=>{
        const emptyErrorArray = []
        expect(output[1]).toStrictEqual(emptyErrorArray)
        expect(output[0]).toContainEqual(goodOutput1)
        expect(output[0]).toContainEqual(goodOutput2)
        expect(output[0]).toContainEqual(goodOutput3)
        expect(output[0]).toContainEqual(goodOutput4)
    })
    })