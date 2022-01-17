import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Modal } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import styled from "styled-components"
import {
  Copyright,
  CustomAvatar,
  CustomButton,
  CustomCol,
  CustomContent,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomLayout,
  CustomPasswordInput,
  CustomRow,
  Heading2,
} from "../../common/components"
import {
  authenticateUser,
  authenticateUserHideError,
} from "../../actions/user/user.actions"

import { isLoggedIn } from "../../common/utils/session/session"
import { PATH_MAIN } from "../../common/constants/web-site-route.constants"
import { RootState } from "../../reducers/root_reducers"

const StyledCol = styled(CustomCol)``

const StyledRow = styled(CustomRow)``

const ContentContainer = styled.div`
  text-align: center;
  height: 100vh;
  padding: 25vh 0 25vh  20px;

 
`
const ContentContainer1 = styled.div`
  text-align: center;
  height: 84%;
  background-color: ${({ theme }) => theme.backgroundColor};

  padding: 35px  20px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
  0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

`

const FormContainer = styled.div``

const Login: React.FunctionComponent = () => {
  const { showAuthenticationError, isSubmitted } = useSelector(
    (state: RootState) => state.user
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (showAuthenticationError) {
      Modal.error({
        title: "Error",
        content:
        "Ocurrió un error al iniciar sesión, por favor verifique sus datos.",
        onOk() {
          dispatch(authenticateUserHideError())
        },
      })
    }
  }, [showAuthenticationError])
  
  if (isLoggedIn()) {
    return <Navigate to={PATH_MAIN} />
  }
  return (
    <CustomLayout>
      <CustomContent>
        <StyledRow justify={"center"} >
          <StyledCol  xs={13}  sm={11} md={9} lg={8} xl={5}>
            <ContentContainer>
              <ContentContainer1>
              <CustomAvatar
                size={40}
                icon={<LockOutlined />}
              />
              <Heading2>Iniciar Sesión</Heading2>
              <CustomDivider />
              <CustomForm
                onFinish={({ username, password }) => {
                  dispatch(authenticateUser(username, password))
                }}
              >
                <FormContainer>
                  <CustomRow gutter={[0, 8]}>
                    <CustomCol xs={24}>
                      <CustomFormItem
                        required
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "El campo Usuario es requerido",
                          },
                        ]}
                      >
                        <CustomInput
                          prefix={<UserOutlined />}
                          placeholder={"Usuario"}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24}>
                      {" "}
                      <CustomFormItem
                        required
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "El campo Contraseña es requerido",
                          },
                        ]}
                      >
                        <CustomPasswordInput
                          prefix={<LockOutlined />}
                          placeholder={"Contraseña"}
                        />
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24}>
                      <CustomFormItem>
                        <CustomButton
                          htmlType="submit"
                          type="primary"
                          disabled={isSubmitted}
                          loading={isSubmitted}
                        >
                          Iniciar Sesión
                        </CustomButton>
                      </CustomFormItem>
                    </CustomCol>
                  </CustomRow>
                </FormContainer>
              </CustomForm>
              <Copyright /></ContentContainer1>
            </ContentContainer>
          </StyledCol>
        </StyledRow>
      </CustomContent>
    </CustomLayout>
  )
}

export default Login
