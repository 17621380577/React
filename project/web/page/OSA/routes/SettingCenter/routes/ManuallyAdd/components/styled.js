import styled, {
    injectGlobal
} from 'styled-components';
const modalMarginLeft = '80px';
const Wrapper = styled.div`

`
const ModalWrapper = styled.div`
    
`
injectGlobal`
    .tradingSession{
        .ant-table{
            width:600px;
        }
    }
    .createOrModifyModal{
        .operateBtn{
            width:20px;
            height:20px;
            border-radius:50%;
            background-color:#1890ff;
            color:#fff;
            font-size:30px;
            text-align:center;
            line-height:15px;
            margin-top:8px;
            cursor:pointer;
        }
        .operateBtn.sp{
            opacity:0;
            cursor:auto;
        }
        .timeWrapper{
            margin-bottom:0;
        }
    }
`

module.exports = {
    Wrapper,ModalWrapper
};