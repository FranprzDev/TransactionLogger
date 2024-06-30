import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { emailRegex, passwordRegex } from '../../js/constants';
import useAuth from '../../hooks/useAuth';


function Login() {  

  const { dateForm, updateForm, testRegex } = useAuth({"mail": "", "password": ""});

  const onFinish = (values) => {
    if (testRegex(emailRegex, values.mail) && testRegex(passwordRegex, values.password))
    {
      const data = {
        mail: values.mail,
        password: values.password
      }
      updateForm(data)

      console.log(dateForm)
    } else {
      onFinishFailed("Invalid email or password");
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 1000,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Mail"
      name="mail"
      rules={[
        {
          required: true,
          message: 'Please input your mail!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default Login
