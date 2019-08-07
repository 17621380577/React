import React,{Component} from 'react'
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

export class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>HomePage</Breadcrumb.Item>
                    <Breadcrumb.Item>Welcome</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                Welcome to use OSA
                </Content>
            </Layout>
        )
    }
}
module.exports = Welcome;
