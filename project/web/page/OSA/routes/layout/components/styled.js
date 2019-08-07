import styled, {
    injectGlobal
} from 'styled-components';
const WrapperHeader = styled.div`
    margin-bottom: 15px;

    .icon {
        text-align: right;
    }
    
    .langChange {
        .ant-select-selection--single {
            color: #899EB1;
            background: #252020;
            border: 0;
        }
    }

    .closeStatus {
        color: red;
    }

    .openStatus {
        color: green;
    }

    .logo {
        display: flex;
        align-items: center;

        img {
            height: 32px;
            width: auto;
            margin-right: 10px;
        }
    }
    
    .userName {
        position: relative;
        span {
            display: inline-block;
            height: 100%;
        }
        .userOps {
            position: absolute;
            left: -24px;
            top: 48px;
            z-index: 1;
            text-align: center;
            height: 40px;
            width: 120px;
            background-color: #282638;
            box-shadow: 0 0 18px 0 rgba(25, 23, 38, 0.31);
            border-radius: 3px;
            font-size: 12px;
            .link {
                width: 100%;
                margin: 0 auto;
                text-align: center;
                height: 40px;
                line-height: 40px;
                color: #899EB1;
                cursor: pointer;
                &:hover {
                    color: #fff;
                    background-color: #39364b;
                }
            }
        }

       
`;
injectGlobal `
    .headerLang {
        color: #899EB1;
        text-align: center;
        background-color: #282638;
        box-shadow: 0 0 18px 0 rgba(25, 23, 38, 0.31);
        width: 154px;
        left: -25px;
        .ant-select-dropdown-menu-item {
            color: #899EB1;
        }
        .ant-select-dropdown-menu-item-selected {
            color: #fff;
            background-color: #282638;
        }
        .ant-select-dropdown-menu-item-active {
            color: #fff;
            background-color: #39364b;
        }
    }
`;
module.exports ={ 
    WrapperHeader
}