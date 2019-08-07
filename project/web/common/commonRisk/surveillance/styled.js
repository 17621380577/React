import styled, {injectGlobal} from 'styled-components';

const SurveillanceWrapper = styled.div`
    .ant-form-item-label label:after{
        visibility: hidden;
    }
    .assetPagination{
        position: relative;
        text-align: right;
        .ant-pagination-options-size-changer{
            position: absolute;
            left: 0;
        }
    }
    .statistic{
        p{
            margin: 0 0 0 0;
        }
        span{
            min-width: 70px;
            display: inline-block;
        }
    }
`;
injectGlobal`
    .operateSurveillanceModal{
        .ant-modal{
            width: 650px !important;
        }
        .ant-modal-body{
            max-height: 650px;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .ant-form-item-label label:before, .ant-form-item-label label:after{
            visibility: hidden;
        }
        .ant-table-body{
            max-height: 418px;
            overflow-y: auto;
            .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
                padding: 8px;
            }
        }
    }
`;
module.exports = {
    SurveillanceWrapper
}