import React,{Component} from 'react';
import { hashHistory } from 'react-router';
import {Decimal} from 'decimal.js';
import moment from "moment-timezone";
Decimal.set({precision: 32});
const Common = React.createClass({
    compare(arg1, arg2) {
        let x, y, result='';
        try{
            x = new Decimal(arg1);
        }catch(e){ 
        }
        try{
            y = new Decimal(arg2);
        }catch(e){
        }
        try{
            result = x.comparedTo(y);
        }catch(e){
            return;
        }
        return result;
    },
    accAdd(arg1, arg2) {
        // 相加
        let x, y, result='';
        try{
            x = new Decimal(arg1);
        }catch(e){ 
        }
        try{
            y = new Decimal(arg2);
        }catch(e){
        }
        try{
            result = x.plus(y);
        }catch(e){
            return;
        }
        return result.valueOf().toString();
    },
    accSub(arg1, arg2) {
        // 相减
		let x, y, result='';
        try{
            x = new Decimal(arg1);
        }catch(e){ 
        }
        try{
            y = new Decimal(arg2);
        }catch(e){
        }
        try{
            result = x.minus(y);
        }catch(e){
            return;
        }
        return result.valueOf().toString();
    },
    accMul(arg1, arg2) {
        //准确获得两个浮点数相乘
        let x, y, result='';
        try{
            x = new Decimal(arg1);
        }catch(e){ 
        }
        try{
            y = new Decimal(arg2);
        }catch(e){
        }
        try{
            result = x.times(y);
        }catch(e){
            return;
        }
        return result.valueOf().toString();
    },
    accDiv(arg1,arg2) {
        // 相除
        let x, y, result='';
        try{
            x = new Decimal(arg1);
        }catch(e){ 
        }
        try{
            y = new Decimal(arg2);
        }catch(e){
        }
        try{
            result = x.dividedBy(y);
        }catch(e){
            return;
        }
        return result.valueOf().toString();
    },
    getLS(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    setLS(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    formatDate(date, fmt) {
        if (typeof date == 'string' || typeof date == 'number') date = new Date(date);
        if (!date || date.toString() == 'Invalid Date') return '';
        return moment.tz(date, "America/New_York").format(fmt || "YYYY-MM-DD HH:mm:ss")
    },
    formatDateCurrent(date, fmt){
        // debugger
        if (typeof date == 'string' || typeof date == 'number') date = new Date(date);
        if (!date || date.toString() == 'Invalid Date') return '';
        var o = {
            "M+": date.getMonth() + 1, //月份
            "D+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S+": date.getMilliseconds() //毫秒
        };
        if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    formatNum(num) {
        if (!num) return 0;
        return num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    downloadFile(fileName, content) {
        var aLink = document.createElement('a');
        var blob = new Blob(['\uFEFF' + content], {type: "text/csv/pdf;charset=utf-8"});
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        if (fileName) {
            aLink.download = fileName;
        }
        aLink.target = "_blank";
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(evt);
    },
    downloadPdfFile(fileUrl) {
        let elem = document.createElement('iframe');
        elem.src = fileUrl;
        elem.style.display = 'none';
        document.body.appendChild(elem);
    },
    commafy(num, index, separator, rententionNum){ //num->数值(必传),index->分隔位数,separator->分隔符号,rententionNum->小数位数
        //千分位格式化
        if(!num) {num = 0};
        if (!index) {index = 3;}
        if (!separator) {separator = ',';}
        if (!rententionNum) {rententionNum = 2;}
        num = num && Number(num).toFixed(rententionNum);
        let reg = new RegExp('(-?[0-9]+)([0-9]{' + index + '})');
        if (/^.*\..*$/.test(num)) {
            let pointIndex = num.lastIndexOf('.');
            let intPart = num.substring(0, pointIndex);
            let pointPart = num.substring(pointIndex + 1, num.length);
            let pointLen = pointPart.length;
            if (pointLen >= 1) {pointPart = pointPart + this.getAddStr("0", rententionNum - pointLen);}
            intPart = intPart + '';
            while(reg.test(intPart)) {
                intPart = intPart.replace(reg, '$1' + separator + '$2');
            }
            num = intPart + '.' + pointPart;
        } else {
            while (reg.test(num)) {
            num = num.replace(reg, '$1' + separator + '$2');
            }
            num = num + '.' + this.getAddStr("0", rententionNum);
        }
        if(rententionNum=='0'){
            num = num.split('.')[0];
        }
        return num;
    },
    getAddStr(str,num){
        let tmp='';
        for(let i=0;i<num;i++){
            tmp+=str;
        }
        return tmp;
    },
    render() {}
});
const osaCommon = new Common();
module.exports = osaCommon;