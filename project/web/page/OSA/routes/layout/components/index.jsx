import React,{Component} from 'react'
import { Layout, LocaleProvider } from 'antd';
const { Content } = Layout;
const { Sider } = Layout;
import Header from "./header.jsx";
import MenuBar from "./menuBar.jsx";
import Store from 'web-mobx/locale'
import {observer} from 'mobx-react'
import enUS from "antd/lib/locale-provider/en_US";
@observer
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocales: Store.localeConfig.currentLocales,
            localesOps: Store.localeConfig.localesOps
        };
        ["handleChange"].forEach(m=>this[m] = this[m].bind(this))
    }

    handleChange(val) {
        Store.changeLocaleConfig(val);
        this.setState({
            currentLocales: val
        })
    }
    isEmailLinkPage() {
        if (location.hash.match(/email/)) {
            return true;
        }
        return false;
    }

    render() {
        intl.init({
            currentLocale: this.state.currentLocales,
            locales: {
                [this.state.currentLocales]: webOSALoadLang(this.state.currentLocales)
            }
        });
        // let locale = Store.localeConfig.currentLocales=="en-US" ? enUS : null;
        // 只有英文版，强制写死为英文，因为ant-design某些模块内置语言的缘故
        let locale = enUS;
        const headerParam = {
            localesChange: this.handleChange,
            currentLocales: this.state.currentLocales,
            localesOps: this.state.localesOps,
            pathname: this.props.location.pathname
        };
        console.log(headerParam.pathname);
        return (
            <LocaleProvider locale={locale}>
                {headerParam.pathname == '/login' ? 
                    this.props.children : (
                        <Layout style={{height: '100%'}}>
                            {!this.isEmailLinkPage() ? <Header {...headerParam} /> : ""}
                            <Layout>
                                {
                                    !this.isEmailLinkPage() ? <Sider width={200} style={{ background: '#fff' }}>
                                        <MenuBar location={this.props.location} />
                                    </Sider> : ""
                                }
                                <Content>{this.props.children}</Content>
                            </Layout>
                        </Layout>
                    )
                }
            </LocaleProvider>
        )
    }
}
module.exports = App;