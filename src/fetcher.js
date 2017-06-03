"use strict";
let request = require("request");
let {JSDOM} = require("jsdom");
let urlUtil = require("./utils/url");
let keeper = require("./keeper");

class Fetcher {
    fetch(url){
        this.getMediaUrls(url)
        .then(this.save.bind(this), this.errorHandler.bind(this));
    }
    getMediaUrls(url){
        return new Promise((resolve, reject)=>{
            const options = {  
                method: "GET",
                uri: url
            };
            request(options, (error, response, body) => {
                if(error){
                    reject(error);
                } else{
                    const dom = new JSDOM(body);                    
                    //findLinks 
                    let urls = this.findMediaUrls(dom);

                    //resolving with appropriate data
                    resolve({
                        urls
                    });
                }
            });
        });
    }
    findMediaUrls(dom){
        let probableMediaLinks = [];
        //getting data url
        let dataUrlNodes = Array.from(dom.window.document.querySelectorAll("*[data-url]"));
        probableMediaLinks.push(
            ...dataUrlNodes.map(node=>{
                return node.getAttribute("data-url");
            })
        );
        //getting src
        let srcNodes = Array.from(dom.window.document.querySelectorAll("*[src]"));
        probableMediaLinks.push(
            ...srcNodes.map(node=>{
                return node.getAttribute("src");
            })
        );
        //getting href
        let hrefNodes = Array.from(dom.window.document.querySelectorAll("*[href]"));
        probableMediaLinks.push(
            ...hrefNodes.map(node=>{
                return node.getAttribute("href");
            })
        );
        let urls = [];
        probableMediaLinks.forEach(anchorUrl=>{
            if(urlUtil.isMediaUrl(anchorUrl)){
                urls.push(anchorUrl);
            }
        });
        return urls;
    }
    save({urls}){
        console.log(`writing ${urls.length} urls in output file`);
        urls.forEach(url=>{
            keeper.save(url);
        });
        console.log("writing done!");
    }
    errorHandler(err){
        console.log("Error occured");
        console.log(err);
    }
}

module.exports = new Fetcher();