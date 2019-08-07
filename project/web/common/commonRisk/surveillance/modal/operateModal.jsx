import React from 'react'
import { Modal, Button, Row, Col, Form, Select, message, Input} from 'antd'
import "../styled.js"
const FormItem = Form.Item;
const {Option} = Select;
class OperateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            data: []
        };
    }
    componentDidMount(){
        console.log(this.props.clickData);
        this.getRecord();
    }
    handleOk(e){
        const form = this.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if(!err){
                let surveillanceStatus = values.surveillanceStatus;
                let msg = surveillanceStatus == "I" ? "Innocent" : surveillanceStatus == "G" ? "Malicious" : surveillanceStatus == "N" ? "Pending" : "Forwarded";
                let data = {
                    id: this.props.clickData.eventID,
                    memo: values.Memo || "",
                    status: values.surveillanceStatus
                }
                let request = {
                    url: "riskControl.confirmSurveillanceRiskLog",
                    type: "post",
                    data: data,
                    callback: (json) => {
                        if(json && json.errorId == 0){
                            message.success(`This record is ${msg} !`, 3, () => {
                                this.props.returnPage(true);
                            });
                        }else{
                            message.error("Failed to confirm !");
                        }
                    }
                }
                this.sendRequest(request);
            }
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
        this.props.returnPage();
    }
    sendRequest(request){
        if(this.props.projectType == "ATS"){
            webATSAjax(request);
        }else{
            webOSALoadLang(request);
        }
    }
    getRecord(){
        let request = {
            url: "riskControl.querySurveillanceChangeLog",
            type: "post",
            data: {
                id: this.props.clickData.eventID
            },
            callback: (json) => {
                if(json && json.errorId == 0){
                    let data = json.data;
                    this.setState({
                        data: data
                    })
                }
            }
        }
        this.sendRequest(request);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible} = this.state;
        const columns = [{
            title: "S/N",
            dataIndex: "SN",
            render: (text, record, index) => {
                return index + 1;
            }
        }, {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return text == "I" ? "Innocent" : (text == "G" ? "Malicious" : (text == "N" ? "Pending" : "Forwarded"))
            }
        }, {
            title: "Operator name",
            dataIndex: "operatorName"
        }, {
            title: "Memo",
            dataIndex: "memo",
            render: (text) => {
                return <span style={{wordBreak: "break-all"}}>{text}</span>
            } 
        }];
        let isATS = this.props.projectType == "ATS";
        const detail = [{
            key: isATS ? "MBID" : "Client ID" ,
            value: isATS ? this.props.clickData.MBID : this.props.clickData.clientId
        }, {
            key: "Token",
            value: this.props.clickData.token
        }, {
            key: "Reason Code",
            value: this.props.clickData.reasonCode
        }, {
            key: "Status",
            value: this.props.clickData.status == "I" ? "Innocent" : 
                   this.props.clickData.status == "G" ? "Malicious" : 
                   this.props.clickData.status == "N" ? "Pending" : "Forwarded"
        }, {
            key: "Type",
            value: this.props.clickData.eventType == "WT" ? "Wash Transaction" : 
                   this.props.clickData.eventType == "CT" ? "Concentration" : 
                   this.props.clickData.eventType == "LY" ? "Layering" : "Spoofing"
        }, {
            key: "Extra data",
            value: this.props.clickData.extraData
        }];
        const options = ["Innocent", "Malicious", "Pending", "Forwarded"];
        return (
            <Modal visible={visible} style={{padding: 30}} onCancel={this.handleCancel.bind(this)}
            footer={null} wrapClassName="operateSurveillanceModal"
            title={<div style={{ margin: '0 auto'}}>
                <p style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', margin: 0}} >Operate</p>
            </div>
            }>
                <Row style={{margin:'10px 0',fontSize:'16px'}}>
                    <Col span={7} style={{textAlign: "right"}}>Record of changes</Col>
                    <Col span={16} style={{borderBottom:'1px #eee solid',height:'20px', marginLeft: 15}}></Col>
                </Row>
                <Row style={{marginTop: 20}} type="flex" justify="end">
                    <Col span={24}>
                        <WebCommonTable pagination={false} dataSource={this.state.data} columns={columns}/>
                    </Col>
                </Row>
                <Row style={{marginTop: 20, fontSize: '16px'}}>
                    <Col span={7} style={{textAlign: "right"}}>Log Detail</Col>
                    <Col span={16} style={{borderBottom: '1px #eee solid',height:'20px', marginLeft: 15}}></Col>
                </Row>
                <Row style={{marginTop: 10}}>
                     {
                         detail.map( (item, index) => {
                             return <Row key={`detail${index}`}>
                                <Col span={7} style={{textAlign: "right"}}>{item.key}</Col>
                                <Col span={16} style={{marginLeft: 15}}>{item.value}</Col>
                             </Row>
                         })
                     }
                </Row>
                <Row style={{marginTop: 20, fontSize: '16px'}}>
                    <Col span={7} style={{textAlign: "right"}}>Status</Col>
                    <Col span={16} style={{borderBottom: '1px #eee solid',height:'20px', marginLeft: 15}}></Col>
                </Row>
                <Row>
                    <Form>
                        <Row id='surveillanceModal' style={{fontSize: 13}}>
                            <Col span={7} style={{textAlign: 'right', transform: "translateY(7px)"}}>
                                <span style={{color: "red", fontSize: 15}}>* </span>
                                <label>Status</label>
                            </Col>
                            <Col span={16} style={{marginLeft: 15}} >
                                <FormItem>
                                {
                                    getFieldDecorator('surveillanceStatus', {
                                        rules: [{
                                            required: true, message: 'This filed is required !'
                                        }]
                                    })(
                                        <Select placeholder="Please select" name='surveillanceStatus' getPopupContainer={()=>document.getElementById('surveillanceModal')}>
                                            {
                                                options.map( (item, index) => {
                                                    let value = item == "Innocent" ? "I" : (item == "Malicious" ? "G" : (item == "Pending" ? "N" : "W") );
                                                    return <Option style={{color: item == "Malicious" ? "red" : ""}} value={value} key={item} >{item}</Option>
                                                })
                                            }
                                        </Select>)
                                }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{fontSize: 13}}>
                            <Col span={7} style={{textAlign: 'right', transform: "translateY(7px)"}}>
                                <span style={{color: "red", fontSize: 15}}>* </span>
                                <label>Memo</label>
                            </Col>
                            <Col span={16} style={{marginLeft: 15}}>
                                <FormItem>
                                {
                                    getFieldDecorator('Memo', {
                                        rules: [{
                                            required: true, message: 'This filed is required !'
                                        }]
                                    })(
                                        <Input maxLength={200} name="Memo" placeholder="Please enter memo" />
                                    )
                                }
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{textAlign: "center", marginTop: 20}}>
                    <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
                    <Button type="primary" style={{marginLeft: 20}} onClick={this.handleOk.bind(this)}>Confirm</Button>
                </Row>
            </Modal>
        )
    }
}
OperateModal = Form.create()(OperateModal);
module.exports = OperateModal;