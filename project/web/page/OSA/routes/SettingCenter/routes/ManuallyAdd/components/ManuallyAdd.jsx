import React,{Component} from 'react'
import { Layout, Breadcrumb,Row,Col,Form,Input,Select,Button,Checkbox,Table,Pagination,Menu,Dropdown,Icon,Modal,message,Switch} from 'antd';
const { Content } = Layout;
import { Wrapper } from './styled'

let curPage = 1;
let pageSize = 10;
export class ManuallyAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        const columns = [{
            title: "服务器id",
            dataIndex: "serverId"
        }, {
            title: "id",
            dataIndex: "Id"
        }, {
            title: "服务器名",
            dataIndex: "serverName"
        },
        {
            title: "服务器类型",
            dataIndex: "serverType"
        }, {
            title: "内网ip",
            dataIndex: "intranetIp"
        }, {
            title: "公网ip",
            dataIndex: "publicNetIp"
        },
        {
            title: "操作",
            dataIndex: "option"
        }]
        return ( 
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {
                        this.props.routes.map(function(item, index) {
                            return <Breadcrumb.Item key="">{item.breadcrumbName}</Breadcrumb.Item>
                        })
                    }
                </Breadcrumb>
                <Content>
                    <Wrapper>
                        <Button type='primary' className='addBtn'>新增</Button>
                        <WebCommonTable pagination={false} dataSource={this.state.data} columns={columns}/>
                    </Wrapper>
                </Content>
            </Layout>
        )
    }
}
module.exports = ManuallyAdd