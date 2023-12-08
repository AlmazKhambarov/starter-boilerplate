/** @format */

import React, { Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import {
  getSingleUserReques,
  updateUser,
  getALlUsersRequest,
} from "redux/actions/Users";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

export class EditProfile extends Component {
  avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";
  formRef = React.createRef();

  state = {
    avatarUrl: "/img/avatars/thumb-6.jpg",
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  async componentDidMount() {
    const { getSingleUserReques, match, getALlUsersRequest } = this.props;
    await getSingleUserReques(match?.params.id);
    await getALlUsersRequest();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.formRef.current.setFieldsValue({
        id: this.props.user.id,
        name: this.props.user.name,
        email: this.props.user.email,
        username: this.props.user.username,
        phoneNumber: this.props.user.phone,
        website: this.props.user.website,
        street: this.props.user.address.street,
        city: this.props.user.address?.city,
        postcode: this.props.user.address.zipcode,
      });
    }
  }
  render() {
    const onFinish = async (values) => {
      const { updateUser, history, match } = this.props;
      await updateUser({ ...values, Id: match.params.id, address: {} });
      setTimeout(() => {
        // Navigate to the "/app/pages/user-list/" route after 3 seconds
        history.push("/app/pages/user-list/");
      }, 3000);
    };

    const onFinishFailed = (errorInfo) => {
      //   console.log("Failed:", errorInfo);
    };

    const onUploadAavater = (info) => {
      const key = "updatable";
      if (info.file.status === "uploading") {
        message.loading({ content: "Uploading...", key, duration: 1000 });
        return;
      }
      if (info.file.status === "done") {
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            avatarUrl: imageUrl,
          })
        );
        message.success({ content: "Uploaded!", key, duration: 1.5 });
      }
    };

    const onRemoveAvater = () => {
      this.setState({
        avatarUrl: "",
      });
    };

    const { avatarUrl } = this.state;
    return (
      <>
        <Flex
          alignItems='center'
          mobileFlex={false}
          className='text-center text-md-left'>
          <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
          <div className='ml-md-3 mt-md-0 mt-3'>
            <Upload
              onChange={onUploadAavater}
              showUploadList={false}
              action={this.avatarEndpoint}>
              <Button type='primary'>Change Avatar</Button>
            </Upload>
            <Button className='ml-2' onClick={onRemoveAvater}>
              Remove
            </Button>
          </div>
        </Flex>
        <div className='mt-4'>
          <Form
            name='basicInformation'
            layout='vertical'
            ref={this.formRef}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label='Name'
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label='Username'
                      name='username'
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label='Email'
                      name='email'
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label='Date of Birth'
                      name='dateOfBirth'
                      rules={[
                        {
                          required: true,
                          type: "dateOfBirth",
                          message: "Please enter a valid email!",
                        },
                      ]}>
                      <DatePicker className='w-100' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label='Phone Number' name='phoneNumber'>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label='Website' name='website'>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label='Addres' name='street'>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label='City' name='city'>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label='Post code' name='postcode'>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type='primary' htmlType='submit'>
                  Save Change
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const { loading, error, user } = users;
  return { loading, error, user };
};
const mapDispatchToProps = {
  getSingleUserReques,
  updateUser,
  getALlUsersRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
