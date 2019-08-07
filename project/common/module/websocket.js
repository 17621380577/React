// 远程服务配置
let connection;

let initWS = function (fullUrl) {
    if ('WebSocket' in window) {
        connection = new WebSocket(fullUrl);
    } else if ('MozWebSocket' in window) {
        connection = new MozWebSocket(URL);
    } else {
        alert("Your browser does not support websocket, please replace the lastest version of the browser.");
    }
    return connection;
}

// 以下的代码和 ../framework/libraries/websocket/WebsocketClient.js 保持一致
function WebsocketClient() {
    this.websocket = null;
    this.connected = false;

    // 连接关闭时的回调
    this.onclose = null;
    // 连接建立后的回调
    this.onconnect = null;
    // 连接出错的回调
    this.onerror = null;

    this.touchTime = 60 * 1000;

    // 推送消息的外部回调函数 onMsgReceive(topic,data)
    this.onMsgReceive = null;

    // 回调请求的缓存 requestid:{timeout,callback}
    this.serviceReqMap = {};

    // 生成service请求号
    this.uniqueNumber = ((function () {
        var value = 0;
        return function () {
            return ++value;
        };
    })());
}

// service 调用的网络错误
WebsocketClient.prototype.SERVICE_CALL_ERROR_CODE_NETWORK = -1;
// service 调用的超时错误
WebsocketClient.prototype.SERVICE_CALL_ERROR_CODE_TIMEOUT = -2;
//service 调用的主动关注错误
WebsocketClient.prototype.SERVICE_CALL_ERROR_CODE_CLOSE = -3;



//连接
WebsocketClient.prototype.connect = function (url, sessionid, callback) {
    if (!url) {
        throw new error('no url found.');
    }
    let fullUrl = url;
    if(sessionid != undefined && sessionid != null && sessionid != "") {
        fullUrl = fullUrl + '?token=' + sessionid;
    }

    try {
        if ('WebSocket' in window) {
            this.websocket = initWS(fullUrl);
        } else if ('MozWebSocket' in window) {
            this.websocket = initWS(URL);
        } else {
            alert("Your browser does not support websocket, please replace the lastest version of the browser.");
            return false;
        }
    } catch (e) {
        return false;
    }
    var self = this;
    this.websocket.onopen = function (evnt) {
        self.setConnected(true);

        if (self.onconnect != null) {
            self.onconnect(evnt);
        }
        callback();
    };

    this.websocket.onerror = function (evnt) {
        self.setConnected(false);
        self.onclose = null;
        if (self.onerror != null) {
            self.onerror(evnt);
        }

        self.disconnect(evnt);

    };
    this.websocket.onclose = function (evnt) {
        if (self.onclose != null && (event != null || event.code != 1000)) {
            self.onclose(evnt);
            self.onclose = null;
        }
        self.disconnect(evnt);
    };
    // 处理报文收取
    this.websocket.onmessage = function (evnt) {
        try {
            // 目前只处理string类型的报文
            if (typeof evnt.data != "string") {
                return;
            }

            var response = JSON.parse(evnt.data);

            // 处理报文类型
            if (response.data !== "success") { // 处理订阅的报文
                if (response.data != "") {
                    if (self.onMsgReceive != null) {
                        if (response.type) {
                            self.onMsgReceive(response.type, response.data, response);
                        } else if (response.data.type) {
                            self.onMsgReceive(response.data.type, response.data, response);
                        }
                    }
                }
            } else { // 处理服务调用

                if (self.serviceReqMap == null || typeof self.serviceReqMap[response.requestId] == "undefined" || self.serviceReqMap[response.requestId] == null) {
                    // console.warn(response.requestId + " call error! " + evnt.data);
                    return;
                }

                var callback = self.serviceReqMap[response.requestId].callback;
                // 清理超时回调处理
                clearTimeout(self.serviceReqMap[response.requestId].t);

                if (callback != null) {
                    callback(response.headerErrorCode, response.errorCode, response.errorMsg, response.data);
                }

                if(self.serviceReqMap != null) {
                    delete self.serviceReqMap[response.requestId];
                }
            }
        }
        catch (e) {
            console.error(e + ":" + evnt.data);
        }
    }

    // this.websocket.connect();
    // begin touch
    setTimeout(_WebsocketClientTouch(this), this.touchTime);
    return true;
};

WebsocketClient.prototype.setOnclose = function (func) {
    if (func === undefined || func == null) {
        return;
    }

    this.onclose = func;
};

// 连接成功回调
WebsocketClient.prototype.setOnConnect = function (func) {
    if (func === undefined || func == null) {
        return;
    }

    this.onconnect = func;
};

// 连接异常回调
WebsocketClient.prototype.setOnError = function (func) {
    if (func === undefined || func == null) {
        return;
    }

    this.onerror = func;
};


//发送消息
WebsocketClient.prototype.send = function (data) {
    this.websocket.send(JSON.stringify(data));
};

//私有流订阅
WebsocketClient.prototype.auth = function (token) {
    var subData = {command: 'AUTH', data: {accessToken: token}};
    this.send(subData);
};

//订阅
WebsocketClient.prototype.subscribe = function (topic, params) {
    if (topic === undefined || topic == null || topic == "") {
        console.error("订阅主题不正确");
        return;
    }
    var subData = {command: 'SUBSCRIBE', data: {channel: topic}};
    if(params != null && params !== undefined) {
        subData.data.params = params;
    }
    this.send(subData);
};

//取消订阅
WebsocketClient.prototype.unsubscribe = function (topic, params) {
    if (topic === undefined || topic == null || topic == "") {
        console.error("订阅主题不正确");
        return;
    }
    var subData = {command: 'UNSUBSCRIBE', data: {channel: topic}};
    if(params != null && params !== undefined) {
        subData.data.params = params;
    }
    this.send(subData);
};

//注册消息接收方法
WebsocketClient.prototype.register = function (callback) {
    this.onMsgReceive = callback;
};

//退出
WebsocketClient.prototype.disconnect = function () {
    if (this.websocket != null) {
        this.websocket.close(1000, "关闭连接");
        this.websocket = null;
        this.onclose = null;
        this.onconnect = null;
        this.onerror = null;

        // this.log("关闭连接");
        this.setConnected(false);

        // 处理 未处理的service 回调
        for (var obj in this.serviceReqMap) {
            var callback = this.serviceReqMap[obj].callback;

            // -2 代表超时, -1 代表网络出现问题, -3 代表主动关闭连接
            callback(WebsocketClient.prototype.SERVICE_CALL_ERROR_CODE_CLOSE);
        }

        this.serviceReqMap = null;
    }
};
//设置连接状态
WebsocketClient.prototype.setConnected = function (flag) {
    this.connected = flag;
};
//判断是否连接
WebsocketClient.prototype.isConnected = function () {
    return this.connected;
};

WebsocketClient.prototype.log = function (message) {
    console.info(message);
};

// 保持连接
WebsocketClient.prototype.touch = function () {

    if (this.connected) {

        var data = {oper: 'touch'};

        this.websocket.send(JSON.stringify(data));
        // mobileApp.log("WebsocketClient touched");
        setTimeout(_WebsocketClientTouch(this), this.touchTime);

    }
};

// touch的时间间隔
WebsocketClient.prototype.setTouchTime = function (time) {
    this.touchTime = time;
};

// 调用service
// callback(headerErrorCode, errCode, errMsg, result)
// headerErrorCode: -2 代表超时, -1 代表网络出现问题
WebsocketClient.prototype.callService = function (service, method, params, callback, timeout = 1000) {

    // -1 代表网络出现问题
    if (this.connected == false) {
        callback(WebsocketClient.prototype.SERVICE_CALL_ERROR_CODE_NETWORK);
    }

    // 拼装需要发送的对象报文
    var data = {oper: 'callservice'};
    var requestId = this.uniqueNumber();
    requestId = requestId.toString();
    data.requestId = requestId;
    data.url = "/service/" + service + "/" + method;
    data.params = params;
    data.method = "POST";

    // 指定超时回调
    var t = setTimeout(function () {
        if (this.serviceReqMap == null || typeof this.serviceReqMap[requestId] == "undefined" || this.serviceReqMap[requestId] == null) {
            return;
        }

        var callback = this.serviceReqMap[requestId].callback;

        // -2 代表超时, -1 代表网络出现问题
        if (callback != null) {
            callback(WebsocketClient.prototype.SERVICE_CALL_ERROR_CODE_TIMEOUT);
        }

        delete this.serviceReqMap[requestId];

    }.bind(this), timeout);

    // 指定回调
    this.serviceReqMap[requestId] = {callback: callback, timeout: t};

    // 发送报文
    this.send(data);
};

// 保持心跳回调函数
function _WebsocketClientTouch(socketClient) {

    var client = socketClient;
    return function () {
        client.touch();
    }

};

module.exports = WebsocketClient;

