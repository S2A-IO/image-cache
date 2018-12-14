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

| Field    | Description      | Required       |
|----------|-------------|----------------|
| images   | can be array of source or single source.  | **YES** |
```
```
let image = 'http://image.tmdb.org/t/p/w780/aFLWk6TUhHLzru92oNEVQ4nfFea.jpg'; 
// Please change the parameters with valid values and parameters to run the case
var cacheImageResponse = ImageCache.getInstance().get( image ).then( function result( imageResponse ){
  if ( imageResponse ) {
    return imageResponse;
  } else {
    return images;
  }
});
```  
