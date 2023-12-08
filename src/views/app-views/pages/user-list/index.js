/** @format */

import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";
import userData from "assets/data/user-list.data.json";
import { connect } from "react-redux";
import { getALlUsersRequest, deleteUser } from "redux/actions/Users";

export class UserList extends Component {
  state = {
    userProfileVisible: false,
    selectedUser: null,
  };
  async componentDidMount() {
    const { getALlUsersRequest } = this.props;
    if (this.props.usersData.length < 1) {
      await getALlUsersRequest();
    }
  }

  deleteUsers = (userId) => {
    const { deleteUser } = this.props;
    deleteUser(userId);
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  render() {
    const {  userProfileVisible, selectedUser, loading } = this.state;
    const { usersData } = this.props;

    const tableColumns = [
      {
        title: "User",
        dataIndex: "name",
        render: (_, record) => (
          <div className='d-flex'>
            <a href={`/app/pages/setting/edit-profile/${record.id}`}>
              <AvatarStatus
                src={record.img}
                name={record.name}
                subTitle={record.email}
              />
            </a>
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Company",
        dataIndex: "role",
        sorter: {
          compare: (a, b) => a.role.length - b.role.length,
        },
        render: (_, record) => (
          <span>{record.company && record.company.name}</span>
        ),
      },
      {
        title: "Last online",
        dataIndex: "lastOnline",
        render: (date) => (
          <span>{moment.unix(date).format("MM/DD/YYYY")} </span>
        ),
        sorter: (a, b) =>
          moment(a.lastOnline).unix() - moment(b.lastOnline).unix(),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status) => (
          <Tag
            className='text-capitalize'
            color={status === "active" ? "cyan" : "red"}>
            {status}
          </Tag>
        ),
        sorter: {
          compare: (a, b) => a.status.length - b.status.length,
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className='text-right'>
            <Tooltip title='View'>
              <Button
                type='primary'
                className='mr-2'
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size='small'
              />
            </Tooltip>
            <Tooltip title='Delete'>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUsers(elm.id);
                }}
                size='small'
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <Card bodyStyle={{ padding: "0px" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={tableColumns} dataSource={usersData} rowKey='id' />
        )}
        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            this.closeUserProfile();
          }}
        />
      </Card>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const { loading, error, usersData } = users;
  return { loading, error, usersData };
};
const mapDispatchToProps = {
  getALlUsersRequest,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
