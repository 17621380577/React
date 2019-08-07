import React,{Component} from 'react'
import { Layout, Form, DatePicker, Row, Col, Select, message, Button, Input, Pagination, Menu, Dropdown, Checkbox, Icon } from 'antd';
import moment from "moment";
const Option = Select.Option;
const { Content } = Layout;
const FormItem = Form.Item;
import {SurveillanceWrapper} from "./styled.js"
import OperateModal from "./modal/operateModal.jsx"
const { RangePicker } = DatePicker;
export class CommonSurveillance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    
    render() {
        return <div>Survilliance Page!</div>
    }
}
CommonSurveillance = Form.create()(CommonSurveillance);
module.exports = CommonSurveillance;