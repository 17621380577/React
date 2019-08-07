import React,{Component} from 'react'
import { hashHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;


export class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData: webOSAConf.menuItems,
            rootSubmenuKeys: [],
            openKeys: ['userCenter'],
            selectedKeys: ['userCenter-2fa']
        };
        ['onOpenChange', 'menuChange', 'filterSubMenuKeys'].forEach(m=>this[m] = this[m].bind(this))
    }

    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.filter(key => this.state.openKeys.indexOf(key) === -1)[0];
        console.log(latestOpenKey)
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    }

    menuChange(e) {
        this.setState({selectedKeys: [e.key]});
        hashHistory.push(e.item.props['data-url']);
    }

    filterSubMenuKeys(data) {
        let arr = [];
        data.map(function(item, index) {
            arr.push(item.key);
        })
        return arr;
    }

    componentWillMount() {
        this.setState({
            openKeys: [this.props.location.pathname.split("/").splice(1,)[0]],
            selectedKeys: [this.props.location.pathname.split("/").splice(1,).join("-")],
            rootSubmenuKeys: this.filterSubMenuKeys(this.state.menuData)
        })
    }

    render() {
        if(this.state.menuData.length > 0) {
            return (
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={this.state.selectedKeys}
                    onOpenChange={this.onOpenChange}
                    onClick={this.menuChange}
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['']}
                    style={{ height: '100%', borderRight: 0 }}>
                    {
                        this.state.menuData.map(function(item) {
                            if(item.children && item.children.length > 0) {
                                return <SubMenu key={item.key} title={item.name}>
                                    {
                                        item.children.map(function(secondItem) {
                                            if(secondItem.children && secondItem.children.length > 0) {
                                                return <SubMenu key={secondItem.key} title={secondItem.name}>
                                                    {
                                                        secondItem.children.map(function(thirdItem) {
                                                            return <Menu.Item key={thirdItem.key} data-url={thirdItem.url}>{thirdItem.name}</Menu.Item>
                                                        })
                                                    }
                                                </SubMenu>
                                            } else {
                                                return <Menu.Item key={secondItem.key} data-url={secondItem.url}>{secondItem.name}</Menu.Item>
                                            }
                                        })
                                    }
                                </SubMenu>
                            } else {
                                return <Menu.Item key={item.key} data-url={item.url}>{item.name}</Menu.Item>
                            }
                        })
                    }
                </Menu>
            )
        } else {
            return <div></div>
        }
    }
}

module.exports = MenuBar;