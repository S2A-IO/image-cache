/**
 * These are global variable.
 */
 const ImgCache = require('./imgcache');
 const ImgCachePromise = require('./imgcache-promise');
 var instance = null;
 const DEVICE_READY = 'deviceready';
 const CACHE_SIZE = 50 * 1024 * 1024; // 50MB

/**
 * @author Copyright RIKSOF (Private) Limited.
 *
 * @file This service is used to work with image cache on browsers side.
 *
 * @class [ImageCache] This is a singleton class is use to create only one instance.
 */
class ImageCache {

  /**
   * Constructor gets image cache service ready.
   *
   * @constructor
   */
  constructor() {
    let me = this;
    document.addEventListener( DEVICE_READY, function onDeviceReady() {
      me.ready = true;
      // Change allocated space image cache, default was 10MB
      ImgCache.options.chromeQuota = CACHE_SIZE;
      // NOTE: Only has effect when cordova file is added.
      ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;

      me.init();
    }, false );
  }

  /**
   * Init imgCache library
   *
   * @return {Promise}
   */
  init() {
    if ( !ImgCache.ready ) {
      return ImgCache.init();
    }
    return Promise.resolve();
  }

  /**
   * This static function is use to create instance for the first time if it is null for the first time.
   *
   * @returns {ImageCache} instance.
   */
  static getInstance() {
    this.instance = new ImageCache();
    return this.instance;
  }

  getDeviceReady() {
    let me = this;
    return new Promise( function OnPromiseCompletion( resolve, reject ) {
      if ( !me.ready ) {
        document.addEventListener( DEVICE_READY, function onDeviceReady() {
          me.ready = true;
          me.init();
          // Change allocated space image cache, default was 10MB
          ImgCache.options.chromeQuota = CACHE_SIZE;
          // NOTE: Only has effect when cordova file is added.
          ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;
          resolve();
        }, false );
      } else resolve();
    });
 }

  /**
    * Get cache urls for specified image source urls.
    *
    * @param {string[]} src                Key for which to get the value.
    *
    * @returns {Promise} value             Value for the key.
    */
   get( src ) {
     let p = [];
     if ( Array.isArray( src ) ) {
       for ( let i = 0; i < src.length; i++ ) {
         p[ i ] = this.cacheImage( src[ i ] );
       }
       p = Promise.all( p );
     } else {
       p = this.cacheImage( src );
     }
     if ( !ImgCache.ready ) {
       return this.getDeviceReady( function OnDeviceReady() {
         return p;
       });
     }
     return p;
   }

  /**
   * Get cache url for specified image source url.
   *
   * @param {string} url                  Key for which to get the value.
   *
   * @returns {Promise} value             Value for the key.
   */
  cacheImage( src ) {
    return ImgCachePromise.getCachedFile( src ).then( function GetCachedCallback( originalUrl, cachedFile ) {
      if ( cachedFile == null ) throw new Error();
      else return cachedFile.toURL();
    }).catch( function GetCachedError( e ) {
      return ImgCachePromise.cacheFile( src ).then( function CacheFileCallback( cachedUrl ) {
        return cachedUrl;
      }).catch( function CacheFileError( error ) {
        return src;
      });
    });
  }
}
module.exports = ImageCache;
