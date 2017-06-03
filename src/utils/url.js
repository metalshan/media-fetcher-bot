"use strict";
const config = require("../../config.json");
let mediaExtensions = config.mediaExtensions;


module.exports = {
    //it just validates if an url is a valid url.
    validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    },
    //to check if it's a media url
    isMediaUrl(url){
        let extension = this.findExtension(url);
        if(extension && mediaExtensions.indexOf(extension)!==-1){
            return true;
        } else {
            return false;
        }
    },
    findExtension(url) {
        // Remove everything to the last slash in URL
        let modifiedUrl = url = url.substr(1 + url.lastIndexOf("/"));

        // Break URL at ? and take first part (file name, extension)
        modifiedUrl = modifiedUrl.split("?")[0];

        // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
        modifiedUrl = modifiedUrl.split("#")[0];

        let urlChunks = modifiedUrl.split(".");
        if(urlChunks.length>1){
            return urlChunks[urlChunks.length-1];
        } else {
            return null;
        }
    }
};