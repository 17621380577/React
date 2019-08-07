module.exports = {
    //资产明细
    getAssetsRecord(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            newItem = {
                key: item.assetSymbol,
                index: (index + 1),
                dataSource: item,
                assetSymbol: item.assetSymbol ? item.assetSymbol : "",
                clientName: item.clientName ? item.clientName : "",
                clientId: item.clientId ? item.clientId : "",
                balance: item.balance || 0,
                available: item.available || 0,
                frozenspotmoney: item.frozenspotmoney || 0,
                frozenmoney: item.frozenmoney || 0,
                frozenTotal: osaCommon.accAdd(item.frozenmoney, item.frozenspotmoney) || 0,
                btcAct: 0,
                usdcAct: 0,
            };
            targetList.push(newItem);
        });
        return targetList;

    },
    assetManagement(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            newItem = {
                id: item.id || "",
                assetID: item.assetId || "",
                assetName: item.assetName || "",
                assetCode: item.assetSymbol || "",
                assetType: item.assetType == "1" ? "Token" : "Fiat",
                assetStatus: item.assetStatus == "1" ? "Unlisted" : "Listed",
                deposit: item.depositStatus == false ? "Close" : "Open",
                withdrawal: item.withdrawStatus == false ? "Close" : "Open",
                minWithdrawal: item.withdrawAmount || "",
                withdrawalFeeAlgorithm: item.withdrawFeeAlgor == "1" ? "Percentage" : "Fixed",
                withdrawalFee: item.withdrawFee,
                blockchainAddress: item.linkAddress,
                depositTip: item.depositTipsEn,
                withdrawalTip: item.withdrawTipsEn,
                withdrawalRatio: item.withdrawFeeRate,
                minWithdrawalFee: item.withdrawMinFee,
                blockConfirms: item.blockConfirm,
                iconPicture: item.iconReport
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    clientIDList(response){
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            newItem = {
                clientName: item.clientName,
                clientID: item.clientId,
                email: item.email,
                clientStatus: item.clientStatus,
                createTime: item.createTime,
                updateTime: item.lastUpdateTime,
                MBID: item.mbId
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    apiManagementList(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            newItem = {
                traderId: item.traderId || "",
                clientId: item.clientId || "",
                speed:  (item.queryRateLimit || '-') + '/' + (item.orderRateLimit || "-"),
                apiStatus: item.apiStatus == 1 ? "Active" : (item.apiStatus == 2 ? "Blocked" : "-"),
                apiKeyStatus: item.apiKeyStatus == 1 ? "Created" : (item.apiKeyStatus == 2 ? "-" : "-") ,
                apiKeyCreateTime: item.apiKeyCreateTime || "-",
                applyTime: item.applyTime || "-",
                verifyStatus: item.verifyStatus == 1 ? "Approved" : (item.verifyStatus == 2 ? "Rejected" : (item.verifyStatus == 0 ? "Under review" : "-") ) || "-",
                verifyTime: item.verifyTime || "-",
                finalVerifyStatus: item.finalVerifyStatus == 1 ? "Approved" : (item.finalVerifyStatus == 2 ? "Rejected" : "-") || "-",
                finalVerifyTime: item.finalVerifyTime  || "-"
            };
            targetList.push(newItem);   
        });
        return targetList;
    },
    // 查询订单
    getOpenOrderQuery(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            let productType = '-';
            let side = '-';
            let orderType = '-';
            let orderStatus = '-';
            let timeCondition = '-';
            switch (item.productType) {
                case '1':
                    productType = 'spot';
                    break;
                case '2':
                    productType = 'futures';
                    break;
                case '3':
                    productType = 'option';
                    break;
                default:
                    break;
            }
            if (item.side == '0') side = 'buy';
            if (item.side == '1') side = 'sell';
            switch (item.orderStatus) {
                case '0':
                    orderStatus = 'Fully Executed';
                    break;
                case '1':
                    orderStatus = 'Partial Executed';
                    break;
                case '2':
                    orderStatus = 'Partial Executed';
                    break;
                case '3':
                    orderStatus = 'Not Executed';
                    break;
                case '4':
                    orderStatus = '-';
                    break;
                case '5':
                    orderStatus = 'Canceled';
                    break;
                case '6':
                    orderStatus = 'Partial Executed';
                    break;
                case '7':
                    orderStatus = '-';
                    break;
                case '8':
                    orderStatus = '-';
                    break;
                case '9':
                    orderStatus = '-';
                    break;
                default:
                    orderStatus = 'Reject';
                    break;
            }
            switch (item.timeCondition) {
                case '1':
                    timeCondition = 'IOC';
                    break;
                case '2':
                    timeCondition = 'GFS';
                    break;
                case '3':
                    timeCondition = 'GFD';
                    break;
                case '4':
                    timeCondition = 'GTD';
                    break;
                case '5':
                    timeCondition = 'GTC';
                    break;
                case '6':
                    timeCondition = 'GFA';
                    break;
                default:
                    break;
            }
            newItem = {
                key: index,
                index: (index + 1),
                dataSource: item,
                orderId: item.orderId || '-',
                clientId: item.clientId || '-',
                clientName: item.clientName || '-',
                productType: productType,
                instrumentName: item.instrumentName || '-',
                side: side,
                orderType: item.orderTypeDesc || '-',
                limitPrice: item.limitPrice || '-',
                stopPrice: item.stopPrice || '-',
                displayPrice: item.displayPrice || 0,
                volume: item.volume || 0,
                displayVolume: item.displayShowVolume,
                timeCondition: timeCondition,
                total: item.total || '-',
                orderStatus: orderStatus,
                orderCreateTime: item.insertDateTime || '-',
                orderIp: '-',
                session:item.sessionId || ''
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    //查询被拒订单
    getRejectOrderQuery(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => { 
            let timeCondition = '';
            let side = '';
            side = (item.direction == '0') ? 'buy' : 'sell';
            let orderType = item.orderPriceType ? item.orderPriceType.toLowerCase() : '';
            switch (item.timeCondition) {
                case '1':
                    timeCondition = 'IOC';
                    break;
                case '2':
                    timeCondition = 'GFS';
                    break;
                case '3':
                    timeCondition = 'GFD';
                    break;
                case '4':
                    timeCondition = 'GTD';
                    break;
                case '5':
                    timeCondition = 'GTC';
                    break;
                case '6':
                    timeCondition = 'GFA';
                    break;
                default:
                    break;
            }
            newItem = {
                key: index,
                index: (index + 1),
                dataSource: item,
                clientId: item.clientId || '',
                rejectedCode: item.errorId || '-',
                rejectedReason: item.errorMsg || '-',
                orderType: item.orderTypeDesc || '-',
                instrumentName: item.instrumentName || '-',
                side: side,
                limitPrice: item.limitPrice || '-',
                stopPrice: item.stopPrice || '-',
                displayPrice: item.displayPrice || 0,
                volume: item.volumeTotalOriginal || 0,
                displayVolume: item.displayShowVolume || '-',
                timeCondition: timeCondition,
                total: item.priceTotal || '-',
                orderCreateTime: item.orderCreateTime || '-',
                orderIp: '-',
                session:item.sessionId || ''
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    // 查询历史订单
    getHistoryOrderQuery(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            let productType = '-';
            let side = '-';
            let orderType = '-';
            let orderStatus = '-';
            let timeCondition = '-';
            switch (item.productType) {
                case '1':
                    productType = 'spot';
                    break;
                case '2':
                    productType = 'futures';
                    break;
                case '3':
                    productType = 'option';
                    break;
                default:
                    break;
            }
            if (item.side == '0') side = 'buy';
            if (item.side == '1') side = 'sell';
            switch (item.orderStatus) {
                case '0':
                    orderStatus = 'Fully Executed';
                    break;
                case '1':
                    orderStatus = 'Partial Executed';
                    break;
                case '2':
                    orderStatus = 'Partial Executed';
                    break;
                case '3':
                    orderStatus = 'Not Executed';
                    break;
                case '4':
                    orderStatus = '-';
                    break;
                case '5':
                    orderStatus = 'Canceled';
                    break;
                case '6':
                    orderStatus = 'Partial Executed';
                    break;
                case '7':
                    orderStatus = '-';
                    break;
                case '8':
                    orderStatus = '-';
                    break;
                case '9':
                    orderStatus = '-';
                    break;
                default:
                    orderStatus = 'Reject';
                    break;
            }
            switch (item.timeCondition) {
                case '1':
                    timeCondition = 'IOC';
                    break;
                case '2':
                    timeCondition = 'GFS';
                    break;
                case '3':
                    timeCondition = 'GFD';
                    break;
                case '4':
                    timeCondition = 'GTD';
                    break;
                case '5':
                    timeCondition = 'GTC';
                    break;
                case '6':
                    timeCondition = 'GFA';
                    break;
                default:
                    break;
            }
            newItem = {
                key: index,
                index: (index + 1),
                dataSource: item,
                orderId: item.orderId || '-',
                clientId: item.clientId || '-',
                clientName: item.clientName || '-',
                orderType: item.orderTypeDesc || '-',
                productType: productType,
                instrumentName: item.instrumentName || '-',
                orderStatus: orderStatus,
                side: side,
                fee: item.totalFee || '-',
                limitPrice: item.limitPrice || '-',
                stopPrice: item.stopPrice || '-',
                displayPrice: item.displayPrice || 0,
                average: item.average || '-',
                volume: item.volume || '-',
                displayVolume: item.displayShowVolume || '-',
                executedVolume: item.volumeTraded || '-',
                timeCondition: timeCondition,
                total: item.total || '-',
                orderCreateTime: item.insertDateTime || '-',
                placedBy: '-',
                orderIp: '-',
                session:item.sessionId || ''
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    getOrderTrade(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            let type = '-';
            type = (item.priceSource == item.side) ? "Maker" : "Taker";
            
            newItem = {
                key: index,
                index: (index + 1),
                dataSource: item,
                executedPrice: item.price || '-',
                executedVolume: item.volume || '-',
                total: item.amount || '-',
                type: type,
                fee: item.fee || '-',
                executedTime: item.tradeDatetime || '-'
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    getQueryPreTradeRiskLog(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            let eventType = '-';
            switch(item.eventType) {
                case 'RC':
                    eventType = 'RiskCtl';
                    break;
                case 'OC':
                    eventType = 'OrderCtl';
                    break;
                case 'LC':
                    eventType = 'LossCtl';
                    break;
                case 'CC':
                    eventType = 'CostCtl';
                    break;
                case 'TC':
                    eventType = 'TradeCtl';
                    break;
                case 'SC':
                    eventType = 'StatusCtl';
                    break;
                case 'WT':
                    eventType = 'WashTransaction';
                    break;
                case 'LY':
                    eventType = 'LayeringRisk';
                    break;
                case 'SF':
                    eventType = 'SpoofingRisk';
                    break;
                case 'CT':
                    eventType = 'Concentration';
                    break;
                default:
                    break;
            }
            newItem = {
                key: index,
                index: (index + 1),
                dataSource: item,
                clientId: item.clientId || '-',
                token: item.token || '-',
                eventName: item.eventName || '-',
                eventType: eventType,
                extraData: item.extraData || '-',
                level: item.level || '-',
                reasonCode: item.reasonCode || '-',
                time: item.activityDate ? item.activityDate + ' ' + item.timestamp : '-',
                session:item.sessionId || ''
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    orderManagement(response, pageNum, pageSize) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            newItem = {
                clientId: item.clientId || "",
                displayPrice: item.displayPrice || "",
                insertDateTime: item.insertDateTime || "",
                instrumentName: item.instrumentName || "",
                orderId: item.orderId || "",
                orderStatus: item.orderStatus || "",
                productType: item.productType == '1' ? 'Spot' : (item.Futures == '2' ? 'Futures' : 'Option'),
                side: item.side == '0' ? 'Buy' : 'Sell',
                timeCondition: item.timeCondition || "",
                volumeLeft: item.volumeLeft || "",
                volume: item.volume || "",
                limitPrice: item.limitPrice || "",
                stopPrice: item.stopPrice || '-',
                volume: item.volume || "",
                orderType: item.orderTypeDesc || '-',
                stopPrice: item.stopPrice || '',
                displayVolume: item.displayShowVolume || '',
                originOrderType: item.tempOrderType, 
                key: (pageNum && pageSize) ? (pageNum - 1) * pageSize + index : index,
                session:item.sessionId || ''
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    tokenMasterList(response) {
        let items = response;
        let targetList = [];
        let newItem = null;
        items.map((item, index) => {
            let listingStatus = '';
            let tradingStatus = '';
            switch(item.instrumentLife.toString()) {
                case '1':
                    listingStatus = 'unlisted';
                    break;
                case '2':
                    listingStatus = 'listed';
                    break;
                case '3':
                    listingStatus = 'paused';
                    break;
                case '4':
                    listingStatus = 'retired';
                    break;
            }
            switch(item.tradeStatus.toString()) {
                case '0':
                    tradingStatus = 'pre-trade';
                    break;
                case '1':
                    tradingStatus = 'break';
                    break;
                case '2':
                    tradingStatus = 'trading';
                    break;
                case '6':
                    tradingStatus = 'close';
                    break;
            }
            newItem = {
                key: index,
                dataSource: item,
                companyName: item.targetAssetCompanyName || "",
                tokenId: item.targetAssetSymbol || "",
                tokenName: item.targetAssetName || "",
                issuingPrice: item.launchPrice || "",
                listingStatus: listingStatus,
                tradingStatus: tradingStatus,
                createTime: item.sysInsertDatetime || "",
            };
            targetList.push(newItem);
        });
        return targetList;
    },
    getWeeklyList(response){
        let arr = [1,2,3,4,5,6,7];
        let items = response;
        let targetList = [];
        let newItem = null;
        let status = false;
        arr && arr.map((item,index)=>{
            items.map((item2, index2) => {
                if(item==item2.week){
                    status = true;
                }
            })
            if(status){
                targetList.push(true);
                status = false; 
            }else{
                targetList.push(false);
            }
        })
        return targetList;
    }
}