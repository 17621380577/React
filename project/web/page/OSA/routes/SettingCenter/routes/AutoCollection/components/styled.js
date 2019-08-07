import styled, { injectGlobal } from 'styled-components';

const EmergencyWrapper = styled.div`
   .textTitle {
       font-weight: bold;
       font-size: 18px;
   }
   .textInfo {
       font-weight: bold;
       margin-top: 25px;
   }
   .description {
       margin-top: 15px;
   }

   .operation-content {
       margin-top: 50px;
   }
   .isEmergency {
    color: #fff;
    background-color: #ff4d4f;
    border-color: #ff4d4f;
   }

   .isNotEmergency {
    color: #ff4d4f;
    background-color: #fff;
    border-color: #ff4d4f;
   }
`;

module.exports = { EmergencyWrapper };
