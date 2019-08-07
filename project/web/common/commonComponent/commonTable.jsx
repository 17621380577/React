import React from 'react';
import {Table} from 'antd';
import {observer} from 'mobx-react';

@observer
export class CommonTable extends React.Component {
    constructor(props) {
        super(props);
    }

    getState() {
        let {noOverWriteKey}=this.props;
        let rowSelection = this.props.rowSelection?this.props.rowSelection:undefined;
        let dataSource = this.props.dataSource? this.props.dataSource:(this.props.tableData ? this.props.tableData.data : [])
        let columns = this.props.columns?this.props.columns:this.props.tableData.columns;
        let className = this.props.className ? this.props.className : undefined;
        let rowClassName = this.props.rowClassName ? this.props.rowClassName : undefined;
        let onRowClick = this.props.onRowClick;
        let rowKey = this.props.rowKey;
        let bordered = this.props.bordered ? this.props.bordered : undefined;
        let size = this.props.size ? this.props.size : undefined;
        // let expandedRowKeys = this.props.expandedRowKeys ? this.props.expandedRowKeys : null ;
        // let onExpand = this.props.onExpand ? this.props.onExpand : null ;
        // let expandedRowRender = this.props.expandedRowRender ? this.props.expandedRowRender : null;

        let needExpand = this.props.needExpand;
        let expandParams = {}
        if(needExpand){
            // 三个expand的属性不能放到外面去判断，不然会对别的页面造成影响
            expandParams = {
                expandedRowKeys: this.props.expandedRowKeys,
                onExpand: this.props.onExpand,
                expandedRowRender: this.props.expandedRowRender
            }
        }

        let scroll = {}
        if(columns.length > 11 || (!rowSelection && columns.length > 10)){
            // 勾选框也算一个columns
            scroll.x = `${Number(columns.length - 10) * 5 + Number(100)}%`
        }

        let tableSetting = {
            bordered: false,
            loading: false,
            size: 'default', 
            pagination: this.props.pagination ? this.props.pagination: false
        }

        let newTableSetting = Object.assign({}, tableSetting, expandParams, {
            className,
            rowClassName,
            rowSelection,
            columns,
            dataSource,
            scroll,
            onRowClick,
            rowKey,
            bordered,
            size

        });

        return newTableSetting;
    }


    render() {
        let tableSetting = this.getState();
        return <Table {...tableSetting}  />
    }
}

module.exports = CommonTable