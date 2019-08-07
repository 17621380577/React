import styled, {injectGlobal} from 'styled-components';

const DashboardWrapper = styled.div`
    h2{
        color: #0956e6;
        margin-bottom: 5px;
    }
    .number{
        .notFirst{
            margin-left: 20px;
        }
        img{
            width: 60px;
        }
        span{
            display: inline-block;
            vertical-align: top;
            text-align: left;
            padding-left: 10px;
            p{
                margin: 0;
            }
            .first{
                font-size: 18px;
                font-weight: bold;
                padding-bottom: 8px;
            }
        }
    }
    .whiteBackground{
        flex: 1;
        border-radius: 2px;
        box-shadow: rgb(214,214,225) 0 0 18px;
        padding: 15px;
        background: #fff;
    }
    .chart{
        margin-top: 20px;
    }
`;
module.exports = {
    DashboardWrapper
}