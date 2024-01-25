# ExifJsonerator
NodeJS App that generates a JSON object of photo exif data for my website.  This app is tailored to me specific needs but hopefully can be used as a template for anyone else who would want to use it.

### Required Output:
My personal website reads photo data from an array of custom objects:

```
photoObject = [
    {
        imgTitle: "Title to be displayed on the web page",
        imgDesc: "Descriptive text of the image.",
        gals: ["Array","of","galleries"],
        imgSrc: "imageFileName.jpg",
        imgDate: ImageCreationDateInEpochTimeMilliseconds,
        imgExp: ["Shutter Speed", "Aperture","ISO"],
        imgCam: "Camera Model"
        imgLens: "Lens Model"
        imgFilters: ["Array","of","Filters","Used"],
        imgLoc: "General geographic location of the image subject.",
        imgExposures: [Array of exposure points, not yet implemented.],
        imgForm: "Format or Medium of image capture."
        key: Integer key number used for reference.  
    }
]
```
### Available Input
This code reads the Exif data available on images using the [exif npm package](https://www.npmjs.com/package/exif).  This package pulls exif data from the image file as an object.  Not every possible exif data is pulled from it, for instance if you use [Exif Pilot](https://www.colorpilot.com/exif.html) to add extra data you may find that some of the tags will not be pulled by **exif**.  Therefore I have made all of my images have the following exif data:

```
{
    image:{
        Model: "Camera Model"
        ImageID: "DESC;<description>;FORM;<imageFormat>;LOC;<location string>"
        Artist: "GAL;<Galleries,split,by,comma>;FILTERS;<filters,split,by,comma>;EXP;<exposures>;",
        ModifyDate: <date entered into website, "DateTime in ExifPilot">
    },
    exif:{
        FNumber: aperture,
        ISO: iso,
        ExposureTime: decimal shutter speed,
        DateTimeOriginal: "YYY:MM:DD hh:mm:ss" <date string>,
        LensModel: "Lens Model"
    }
}
```

Some photos need some manual overrides for various reasons.  In that case, I include a file: "manualOverrides.json" in the directory that the app can parse and override specific entry values.  

## Pseudocode
1. Take in:
    1. Directory of folder of photos.
    2. Output directory for final JSON file.
2. Check file paths:
    1. If input directory is invalid, ABORT.
    2. If output directory is invalid, ABORT.
3. Get files in directory:
    1. If no *.jpg or *.jpgs exist, ABORT.
3. Iterate through each file, get and format relevant data:
    1. Image Title
    2. Image Camera
    3. Image Lens
    4. Image Exposure
        1. Parse and format decimal shutter speed into string.
        2. Format aperture into string.
        3. Compile Array
    5. Image Date and Modify date
    6. Split and format ImageID and Author to get
        1. Image description.
        2. Gallery array.
        3. Format.
        4. Location.
        5. Filter array.
        6. Exposure data.
    7. If tags are missing for any item from 1-6 (including subitems) then ABORT.
    8. Build JSON object and push it to the empty JSON array.
4. Step 3 starts each image separately and responds at different times, returning a disordered array of objects. So the list needs ordered by the date added to the system.  The key is incrementally increased starting at 0.
5. Write the JSON file. 
6. Display final output and any errors if they exist.

## Setup
1. `npm install exif --save-dev jest` to install the exif and jest packages (if you want to run my tests).
2. Enter your directories.
3. `node ExifJSONerator.js`
