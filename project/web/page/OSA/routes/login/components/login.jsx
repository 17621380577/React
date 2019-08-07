import React from 'react'
import { hashHistory } from 'react-router'
import { Row, Col,Layout } from "antd"
import { WrapperLogin } from "./styled"
import LoginForm from "./login-form.jsx"
import { observer } from 'mobx-react'
import userStore from 'web-OSA-store/userinfo';
const logo = require('web-OSA-imgs/logo.png');
const { Header } = Layout;
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: true
        };
        ["loginSuccess", "nextStep", "setStorage"].forEach(m => this[m] = this[m].bind(this));
    }

    nextStep(email, data) {
        this.setState({
            toLogin: false
        })
        this.loginSuccess(data);
    }

    loginSuccess(data) {
        this.setStorage(data);
    }

    setStorage(data) {
        let that = this;
        webOSABns.setUserInfo(data);
        hashHistory.push("/Dashboard");   
    }

    componentDidMount() {
        // login之前登出
        this.clearData();
    }

    clearData() {
        localStorage.clear();
        userStore.changeInfo({});
    }

    render() {
        return (
            <WrapperLogin>
                <Header>
                    <div className="logo" style={{display: 'flex'}}>
                        <img src={logo}></img>
                    </div>
                </Header>
                <Row className="loginFrame" type="flex" justify="center" align="middle">
                    <Col span={7} style={{marginTop: -100}}>
                        <Row className="title">
                            Welcome to <span style={{fontWeight: 'bold'}}>OSA</span>
                        </Row>
                        <Row>
                            {
                                this.state.toLogin ?
                                (<div>
                                    <LoginForm nextStep={this.nextStep.bind(this)} />
                                </div>) : <div></div>
                            }
                        </Row>
                    </Col>
                </Row>
            </WrapperLogin>
        )
    }
}

module.exports = Login;