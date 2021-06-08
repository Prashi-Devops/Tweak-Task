var im   = require('imagemagick');
var util = require('util');
var async = require('async');

const imagemagicks = async.series([
    function(url) {
        im.identify(['-format', '%[EXIF:DateTime]' ,url],(err, metadata)=>{
          if (err) return err;
          return { 'date': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:DateTimeDigitized]'  ,url],(err, metadata)=>{
            if (err) return err;
            return { 'dateDigitized': metadata.trimRight() };
          });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:DateTimeOriginal]' ,url], (err, metadata)=>{
          if (err) return err;
          return { 'dateOriginal': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:ExifImageLength]' ,url], (err, metadata)=>{
          if (err) return err;
          return { 'length': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:ExifImageWidth]' ,url], (err, metadata)=>{
          if (err) return err;
          return  { 'width': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:GPSLatitude]',url], (err, metadata)=>{
          if (err) return err;
          return { 'GPSLatitude': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:GPSLatitudeRef]',url], (err, metadata)=>{
          if (err) return err;
          return { 'GPSLatitudeRef': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:GPSLongitude]',url], (err, metadata)=>{
          if (err) return err;
          return { 'GPSLongitude': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[EXIF:GPSLongitudeRef]',url ], (err, metadata)=>{
          if (err) return err;
          return { 'GPSLongitudeRef': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[IPTC:2:25]',url ], (err, metadata)=>{
          if (err) return err;
          return { 'Keywords': metadata.trimRight().split(';') };
        });
    },
    function(url) {
        im.identify(['-format', '%[IPTC:2:55]',url ], (err, metadata)=>{
          if (err) return err;
          return { '2-55': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[IPTC:2:60]',url ], (err, metadata)=>{
          if (err) return err;
          return { '2-60': metadata.trimRight() };
        });
    },
    function(url) {
        im.identify(['-format', '%[IPTC:2:120]',url ], (err, metadata)=>{
          if (err) return err;
          return { 'Caption': metadata.trimRight() };
        });
    }
],(err, results)=>{
    if(err) return err;
    let res = util.log(util.inspect(results));
    return res;
});

module.exports = imagemagicks;
