import React,{Component} from 'react'
import { hashHistory} from 'react-router';
import { message } from 'antd';
import {observer} from 'mobx-react/index';
import loadingMaskStore from 'web-OSA-store/loadingMask';

let env = process.env.NODE_ENV;

let perConf = env == "production" ? require(`buildConf/releaseConfig.json`) : require(`buildConf/devConfig.json`);
let mode = perConf.mode;

const host = webOSAConf.ajax.host;
const apiList = webOSAConf.ajax.apiList;
const Ajax = observer(React.createClass({
    ajax(ops) {
        let config = Object.assign({
            url: "",
            data: {},
            handleResponse: false,
            callback: function() {},
            type: "post",
            param:'',
            isOriginalData: false
        }, ops);
        if(config.url.match(/^\//)) {config.url = config.url.substr(1, config.url.length)}
        let apiUrl = apiList;
        config.url.split(".").map(key => apiUrl = apiUrl[key]);
        if(mode == "local") {
            var data = require(`../../mockData${apiUrl}.json`);
            setTimeout(() => {
                var consoleData = {
                    requestUrl: apiUrl,
                    requestParams: config.data,
                    responseData: data
                }
                console.log(consoleData)
                config.callback(data);
            },200)
        } else {
            loadingMaskStore.changeStatus(true);
            $.ajax({
                type: config.type,
                url: perConf.notNeedApi ? `${host}${apiUrl}${config.param}` : `${host}/api${apiUrl}${config.param}`,
                contentType: "application/json; charset=utf-8",
                data: config.isOriginalData ? config.data : JSON.stringify(config.data),
                headers: {
                    
                },
                success: function(data, textStatus, request) {
                    let token = request.getResponseHeader("X-JWT");  
                    if(token) {webOSABns.setLS('token', token)}                  
                    loadingMaskStore.changeStatus(false);
                    if(data.errorId == 401) {
                        hashHistory.push("/login");
                    } else {
                        config.callback(data);                        
                    }
                }
            });
        }
    },
    render() {}
}))

const ajaxObj = new Ajax();
module.exports = ajaxObj.ajax;