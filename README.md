# image-cache
Cache the images for the S2A apps
- [Installation](#installation)
- [Usage Example](#usage-example)

## Installation
```
npm install git://github.com/S2A-IO/image-cache --save
```
## Usage Example
```
// Please change the parameters with valid values and parameters to run the case
var cacheImageResponse = ImageCache.getInstance().get(images).then( function result( imageResponse ){
  if ( imageResponse ) {
    return imageResponse;
  } else {
    return images;
  }
});
```  
