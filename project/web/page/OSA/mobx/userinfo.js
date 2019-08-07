import {
    observable,
    action,
    useStrict
} from 'mobx';
useStrict(true);
const defaultValue = {
    "id": "",
    "clientID": null,
    "clientName": "",
    "clientType": "",
    "clientGroup": null,
    "gender": "",
    "brokerID": null,
    "brokerName": null,
    "memberBorkerID": null,
    "memberBorkerName": null,
    "clientFullName": null,
    "identificationType": "",
    "industryCertType": null,
    "identificationID": "",
    "extraID": null,
    "industryID": null,
    "idFrontPhoto": "",
    "idBackPhoto": "",
    "districtID": null,
    "postCode": null,
    "fax": null,
    "kycLevel": 0,
    "businessLicense": null,
    "registerCapital": null,
    "taxRegisterNo": null,
    "orgCode": null,
    "artificialPerson": null,
    "mobilePhone": null,
    "businessContact": null,
    "telephone": null,
    "contactMobilePhone": null,
    "province": null,
    "city": null,
    "address": null,
    "corporNature": null,
    "remark": null,
    "rejectRemark": "",
    "bankID": null,
    "bankAccountID": null,
    "bankAccountPhoto": null,
    "userShortID": null,
    "password": "",
    "applyStatus": "",
    "checkStatus": "",
    "activateStatus":"",
    "operatorID": null,
    "operateDate": "",
    "operateTime": "",
    "recheckerID": null,
    "recheckDate": null,
    "recheckTime": null,
    "recommendedPerson": null,
    "clientChannel": null,
    "reportStatus": null,
    "agentId": null,
    "agentName": null,
    "originBrokerID": null,
    "applicationID": "",
    "businessCardPhoto": null,
    "selfCardPhoto": "",
    "registeredName": "",
    "nickname": null,
    "secret": null,
    "country": null,
    "passportID": null,
    "sound": "",
    "notification": "",
    "isActive": "",
    "googleStatus": "",
    "messageStatus": "",
    "messageSwitch": ""
}
class UserInfo {
    @observable userInfo = osaCommon.getLS("userInfo") || defaultValue;
    @action changeInfo = (info) => {
        this.userInfo = info || defaultValue;
        osaCommon.setLS("userInfo", info);
    };
    @action changeTimeOutFlag(flag){
        this.timeOutFlag = flag;
    }
    @action changeInfoDetail = (key, value) => {
        this.userInfo[key] = value;
        osaCommon.setLS("userInfo", this.userInfo);
    }
    @action changeSessionStatus(flag){
        this.sessionStatus = flag;
    }
}

const observableUserStore = new UserInfo();

export default observableUserStore;