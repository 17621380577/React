import styled, { injectGlobal } from "styled-components";

const WrapperLogin = styled.div`
	background: #252934;
	height: 100%;
	.loginFrame {
		height: 100%;
		.title {
			margin-bottom: 45px;
			color: #d0e9ff;
			font-size: 36px;
			text-align: center;
		}
	}
	.logo {
		img {
		height: 46px;
		width: auto;
		margin-top: 7px;
		}
	}
	.ant-layout-header {
		background: #252934 !important;
	}
`;

const WrapperForm = styled.div`
	.Row {
		border:1px solid #aaa;
		border-radius:2px;
		height:33px;
		font-size:14px;
		&:focus{
			border:1px solid blue;
		};
		.Input {
			width:100%;
			height:29px;
			border:0;outline:none;
			color:#000;
			&:focus{
				border:0;
				outline:none;
			};
			&::placeholder{
				color:#bbb;
			};
		}
	}
	.login-form {
		.forgotBtn {
			font-size: 14px;
			color: #353849;
			margin: 52px 0 36px 0;
			opacity: 0.4;
		}
	}
`;
const Title = styled.h1`
	font-size:20px;
	text-align:left;
	color:black;
	font-weight:bold;
`;


const ButtonWrapper=styled.div`
	.ant-btn-primary:not(:disabled){
		border:0;
		padding:0;
		width:100%;
		font-size:15px;
		height:33px;
		background:#17bfe2;
	}
	.ant-btn-primary[disabled]{
		background-color:#ddd;
		color:#999;
		font-size:15px;
		height:33px;
	}
`;

const TailWrapper=styled.div`
	font-size:15px;
	a{
		font-size:15px;
		color:#999;
	}
`;



module.exports = {
	WrapperLogin,
	WrapperForm,
	Title,
	ButtonWrapper,
	TailWrapper
};