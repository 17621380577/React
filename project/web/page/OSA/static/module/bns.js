import userStore from 'web-OSA-store/userinfo'
import { message } from 'antd';

module.exports = {
    getLS(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    setLS(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getUserInfo(key) {
        if (this.getLS("userInfo")) {
            return this.getLS("userInfo")[key];
        } else {
            return "";
        }
    },
    clearUserInfo() {
        localStorage.setItem("userInfo", JSON.stringify({}));
    },
    setUserInfo(obj){
        let userInfo = this.getLS('userInfo') || {};
        for(let key in obj){
            userInfo[key] = obj[key];
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    // 币种排序
    sortByCoinType(list) {
        if (!list || list.lenght <= 0) return [];
        let coinTypes = list;
        // 数组先排序
        coinTypes = coinTypes.sort();
        // 前两位固定btc,eth，后面的a~z排序
        let array1 = [];
        let array2 = [];
        coinTypes.map((item) => {
            if (item.toUpperCase() == 'BTC' || item.toUpperCase() == 'ETH') {
                array1.push(item);
            } else {
                array2.push(item);
            }
        });
        coinTypes = array1.concat(array2);
        return coinTypes;
    },
    // 交易对排序
    sortByInstrument(list) {
        if (!list || list.lenght <= 0) return [];
        let result = list;
        // 交易对排序
        result = result.sort((a, b) => {
            let arr1 = a.split('/');
            let arr2 = b.split('/');
            if (arr1[1] == arr2[1]) {
                return arr1[0] > arr2[0];
            }
            return arr1[1] > arr2[1];
        });
        // 前两位分母固定btc,eth，后面的a~z排序
        let array1 = [];
        let array2 = [];
        result.map((item) => {
            let deno = item.split('/');
            if (deno[1].toUpperCase() == 'BTC' || deno[1].toUpperCase() == 'ETH') {
                array1.push(item);
            } else {
                array2.push(item);
            }
        });
        result = array1.concat(array2);
        return result;
    },
    queryUserInfo(){
        let p = new Promise((resolve , reject)=>{
            webAjax({
                url: 'login.query',
                data: [],
                callback: (json)=>{
                    if(json !== ""){
                        userStore.changeInfo(JSON.parse(json));
                        resolve(json);
                    }else{
                        message.error('登录超时，请您重新登录')
                        hashHistory.push('/login')
                        reject();
                    }
                }
            })
        })
        return p;
    },
    findTraderFundAddress(flag) {
        return new Promise((resolve , reject)=>{
            webAjax({
                url: 'assets.property.findTraderFundAddress',
                data: ['1', null], // 1->充值地址，2->提现地址
                callback: (json)=>{
                    let coinTypeList = [];
                    for (let key in JSON.parse(json)) {
                        coinTypeList.push(key);
                    }
                    if(flag){
                        resolve([coinTypeList, JSON.parse(json)]);
                    }else{
                        resolve(coinTypeList);
                    }
                }
            })
        })
    }
};