import React, { Component } from 'react'
import { Layout, Breadcrumb, Row, Col, Divider, Radio, Input, Button } from 'antd';
import { EmergencyWrapper } from './styled';
const { Content } = Layout;
const RadioGroup = Radio.Group;
const Search = Input.Search;
export class AutoCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
   
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {
                        this.props.routes.map(function(item, index) {
                            return <Breadcrumb.Item key="">{item.breadcrumbName}</Breadcrumb.Item>
                        })
                    }
                </Breadcrumb>
                AutoCollection Page!
            </Layout>
        )
    }
}
module.exports = AutoCollection