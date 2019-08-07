import React, { Component } from 'react'
import { Layout, Breadcrumb, Row, Col, Select, Input, Button } from 'antd';
import { Wrapper } from "./styled.js";
const Option = Select.Option;
const { Content } = Layout;
export class AssetMgt extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {
                        this.props.routes.map(function (item, index) {
                            return <Breadcrumb.Item key="">{item.breadcrumbName}</Breadcrumb.Item>
                        })
                    }
                </Breadcrumb>
                <Content>
                    <Wrapper>
                        <Row className='Item'>
                            <Col span={3} className='title'>Activity name</Col>
                            <Col span={18}>
                                <Input type="text"/>
                            </Col>
                        </Row>
                        <Row className='Item'>
                            <Col span={3} className='title'>Activity zone</Col>
                            <Col>
                                <Select style={{width:200}} placeholder='Please select your zone'>
                                    <Option key='zoneOne'>Zone one</Option>
                                    <Option key='zoneTwo'>Zone two</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row className='Item' style={{marginTop:200}}>
                            <Col span={2}>
                                <Button type='primary'>Create</Button>
                            </Col>
                            <Col span={2}>
                                <Button>Cancel</Button>
                            </Col>
                        </Row>
                    </Wrapper>
                </Content>
            </Layout>
        )
    }
}
module.exports = AssetMgt