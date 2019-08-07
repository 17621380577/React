import React,{Component} from 'react'
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
export class CommonRoleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: []
        }
    }

    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                      Ssss
                </Content>
            </Layout>
        )
    }
}
module.exports = CommonRoleManagement