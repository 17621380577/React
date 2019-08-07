import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Layout, Button, Modal, Popconfirm, message, Select, Menu, Dropdown, Row, Icon, Col } from 'antd';
import { observer } from 'mobx-react';
import Store from 'web-mobx/locale';
import { WrapperHeader } from "./styled.js";
import userInfoStore from 'web-OSA-store/userinfo';
const { Header } = Layout;
const Option = Select.Option;
const logo = require('web-OSA-imgs/logo-full.png');
@observer
export class AdminHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showUserTooltip: false,
            tradeStatus: false,
            newYorkTime: ""
        };
        ["handleLangChange"].forEach(m => this[m] = this[m].bind(this))
    }


    componentWillMount() {
        this.fetchData();
        this.newYorkTime();
    }

    handleLangChange(val) {
        this.props.localesChange(val);
    }

    fetchData() {
        let that = this;
        webOSALoadLang({
            url: "metric.session",
            type: "get",
            isOriginalData: true,
            callback: function (json) {
                if (json && json.errorId == 0) {
                    let data = json.data;
                    that.setState({
                        tradeStatus: data
                    })
                    userInfoStore.changeSessionStatus(data);
                }
            }
        })
    }

    newYorkTime() {
        let that = this;
        webOSALoadLang({
            url: "metric.datetime",
            type: "get",
            isOriginalData: true,
            callback: function (json) {
                if (json && json.errorId == 0) {
                    let data = json.data;
                    that.setState({
                        newYorkTime: data
                    })
                }
            }
        })
    }

    handleLangChange(val) {
        console.log(val)
        this.props.localesChange(val);
    }
    logout() {
        this.setState({ showUserTooltip: false });
        hashHistory.push("/login");
    }
    showUserOps() {
        this.setState({ showUserTooltip: true });
    }
    hideUserOps() {
        this.setState({ showUserTooltip: true });
    }
    render() {
        const userName = webOSABns.getUserInfo('operatorName');
        const userTooltip = <Row className="userOps">
            <Row className="link logout" onClick={this.logout.bind(this)} >Logout</Row>
        </Row>
        return (
            <WrapperHeader>
                <Header className="header">
                <div className="logo" style={{display: 'flex'}}>
                        <img src={logo}></img>
                        <div>OSA</div>
                    </div>
                </Header>
            </WrapperHeader>
        )
    }
}

module.exports = AdminHeader;