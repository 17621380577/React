import {
    observable,
    action,
    useStrict
} from 'mobx';
useStrict(true);

class Locale {
    @observable localeConfig = {
        localesOps: [{
            name: "简体中文",
            value: "zh-CN"
        }, {
            name: "English",
            value: "en-US"
        }],
        currentLocales: `${navigator.language == 'zh-CN' ? 'zh-CN' : 'en-US'}`,
        hasChangeLocale: false
    };
    @action changeLocaleConfig = (value) => {
        this.localeConfig.currentLocales = value;
    };
    @action setLocaleStatus = () => {
        this.localeConfig.hasChangeLocale = true;
    };
    @action resetLocaleStatus = () => {
        this.localeConfig.hasChangeLocale = false;
    };

}

const observableLocaleStore = new Locale();

export default observableLocaleStore;