module.exports = {
    menuItems: [
        {
            "key": "SettingCenter",
            "name": "配置中心",
            "url": "",
            "children": [
                {
                    "key": "AutoCollection",
                    "name": "自动采集",
                    "url": "/SettingCenter/AutoCollection"
                },
                {
                    "key": "ManuallyAdd",
                    "name": "手动新增",
                    "url": "/SettingCenter/ManuallyAdd"
                }
            ]
        },
        {
            // 需求文档上面没有子路由，所以无children
            "key": "AssetMgt",
            "name": "资产管理",
            "url": "/AssetMgt"
        }
    ],
    ajax: {
        host: "",
        apiList: {
            "common":{
                'nationList':"/common/nation",
                'upload':"/common/upload",
                "download":"/common/load",
                "sysDateTime": "/common/datetime"
            },
            "metric": {
                "session": "/metric/session",
                "datetime": "/metric/datetime"
            },
            "ClientManagement": {
                "FinalVerify": {
                    "getDataList": "/clientAudit/query",
                    "verify": "/clientAudit/audit",
                    "query": "/evaluation/query"
                },
                "IdentityVerification": {
                    "getDataList": "/evaluation/ivList",
                    "verify": "/evaluation/consumerEvaluation",
                    "getDetailInfo": "/evaluation/detail",
                    "load": "/common/load"
                },
                "TraderIDList": {
                    "list": "/traderId/list",
                    "details": "/traderId/details",
                    "loginStatus": "/traderId/loginStatus/manage",
                    "tradingStatus": "/traderId/tradingStatus/manage",
                    "bind": "/traderId/bind/clientId",
                    "getDataList": "/evaluation/ivList",
                    "verify": "/evaluation/consumerEvaluation",
                    "getDetailInfo": "/evaluation/detail",
                    "listExport": "/traderId/list/export",
                    "detailExport": "/traderId/list/detail/export"
                },
                "ClientIDList": {
                    "list": "/clientId/list",
                    "manage": "/clientId/clientStatus/manage",
                    "binding": "/clientId/traderId/binding",
                    "detail": "/clientId/detail",
                    "listExport": "/clientId/list/export",
                    "detailExport": "/clientId/list/detail/export"  
                }
            },
            "APIMgt": {
                "queryApi": "/api/queryApi",
                "finalVerify": "/api/finalVerify",
                "queryVerifyRemark": "/api/queryVerifyRemark",
                "updateLimit": "/api/updateLimit",
                "verify": "/api/verify",
                "queryApiQuestion": "/api/queryApiQuestion",
                "queryVerifyRemark": "/api/queryVerifyRemark",
                "updateApiStatus": "/api/updateApiStatus"
                
            },
            "assetManagement": {
                "listAll": "/asset/listAll",
                "getAllAssetMap": "/asset/getAllAssetMap",
                "assetAll": "/asset/assetAll"
            },
            "product": {
                "add": "/product/add",
                "getProductCodeList": "/product/getProductCodeList",
                "query": "/product/query",
                "update": "/product/update",
                "getGroupNameList": "/product/getGroupNameList"
            },
            "productGroup": {
                "query": "/productGroup/query",
                "add": "/productGroup/add"
            },
            "login": {
                "login": "/login"
            },
            "instrumentManagement": {
                "query": "/instrument/query",
                "update": "/instrument/update",
                "modifyInstrument": "/instrument/modifyInstrument",
                "queryForModify": "/instrument/queryForModify",
                "list": "/instrument/list",
                "modifyFee":"/instrument/modifyFee"
            },
            "exchangeStatus": {
                "modify": "/brokerStatus/modifyBrokerStatus",
                "query": "/brokerStatus/queryBrokerStatus",
                "atsTrading": "/brokerStatus/atsTrading"
            },
            "orderManagement": {
                "openOrderQuery": "/order/qryOrder",
                "historyOrderQuery": "/order/qryFinishOrder",
                "qryOrderTrade": "/order/qryOrderTrade",
                "queryRejectedOrder": '/order/qryRejectedOrder'
            },
            "riskControl":{
                "modifyClientRiskConfig":"/risk/modifyClientRiskConfig",
                "queryClientRiskConfig":"/risk/queryClientRiskConfig",
                "queryClientRiskConfigList":"/risk/queryClientRiskConfigList",
                "resetAllRiskConfig":"/risk/resetAllRiskConfig",
                "querySurveillanceRiskLog": "/risk/querySurveillanceRiskLog",
                "confirmSurveillanceRiskLog": "/risk/confirmSurveillanceRiskLog",
                "querySurveillanceChangeLog": "/risk/querySurveillanceChangeLog",
                "queryAllInstruments": "/preTradeRisk/queryToken",
                "queryPreTradeRiskLog": "/preTradeRisk/query",
                "queryRiskStatisticsGraphics": "/risk/queryRiskStatisticsGraphics",
            },
            "reasonCode": {
                "list": "/reasonCode/list",
                "modify": "/reasonCode/modify",
            },
            "instrumentChannel": {
                "modify":"/instrumentTradChannel/modifyStatus",
                "query": "/instrumentTradChannel/query"
            },
            "order": {
                "onBehalfQuery":"/onBehalf/query",
                "qryOrder":"/order/qryOrder",
                "create":"/order/createOrder",
                "cancel":"/order/cancelOrder",
                "queryByInstrumentName":"/instrument/queryByInstrumentName",
                "queryByClientId":"/clientInfo/queryByClientId",
                "expFinishOrder": "/order/expFinishOrder",
                "expOrder": "/order/expOrder",
                "expRejectedOrder": "/order/expRejectedOrder"
            },
            "deposit": {
                "deposit": "/deposit/deposit"
            },
            "emergency": {
                "detail": "/clientId/detail",
                "closeAllPositions": "/emergency/closeAllPositions",
                "cancelAllOrders": "/emergency/cancelAllOrders",
                "blockNewPositions": "/emergency/blockNewPositions",
                "allowNewPositions": "/emergency/allowNewPositions",
                "set911Mode": "/emergency/set911Mode",
                "emergencyState":"/emergency/emergencyState"
            },
            "dashboard": {
                "market": "/metric/market"
             },
             "SurveillanceSTAReport": {
                "queryStaReport": "/report/queryStaReport",
                "queryAllInstruments": "/report/queryAllInstruments",
                "uploadReport": "/report/uploadReport",
                "staReportDetail": "/report/staReportDetail",
                "getAllClientIdAndTraderId": "/clientId/getAllClientIdAndTraderId"
            },
            "tradingMarketManagement": {
                "queryDailyList":"/session/queryTradingSession",
                "queryWeeklyList":"/session/queryWeek",
                "queryHolidayList":"/session/queryHoliday",
                "queryNextDay":"/session/prepare/build"
            },
        }
    },
    ws: {
        wsUrl: `${document.location.protocol == "https:" ? "wss" : "ws"}://${document.domain == "localhost" ? "172.16.4.123:7002" : document.location.host}/ws`, //上线修改
        wsMaxReconnectCount: 5,
        // 事前事后风控常量
        RISK_LOG: "risk_log"
    }
};  