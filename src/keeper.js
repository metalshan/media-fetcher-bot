"use strict";

let fs = require("fs");
const config = require("../config.json");
const outputFilePath = config.outputCSV;

class Keeper {
    constructor(){
        this.flush();
    }

    //this will append the new data to the file
    save(url){
        let dataToWrite = `\n${url},`;
        this.writeStream.write(dataToWrite);
    }

    //to flush the previous data
    flush(){
        let header = "Media Urls";
        var wstream = fs.createWriteStream(outputFilePath);
        wstream.write(header);
        this.writeStream = wstream;
    }
}

module.exports = new Keeper();