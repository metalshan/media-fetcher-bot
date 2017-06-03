"use strict";

let args = require("yargs").argv;
let fetcher = require("./src/fetcher");
let urlUtils = require("./src/utils/url");

let pageToCrawl = args.page;

//check if valid url
if(!urlUtils.validateUrl(pageToCrawl)){
    console.log("ERR!! Invalid url provided.");
} else {
    fetcher.fetch(pageToCrawl); //it will kickoff the task
}
