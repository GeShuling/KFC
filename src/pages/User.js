import React from 'react'
import {Modal, Button} from 'antd'
import {connect} from 'react-redux'
import {
  openModal,
  closeModal
} from '../store/userReducer'

class User extends React.Component {

  toAdd = e =>{
    this.props.dispatch(openModal())
  }

  render(){
    let {userState} = this.props;
    return (
      <div className="user">
        <h2>用户管理</h2>
        <Button onClick={this.toAdd.bind(this)}>添加</Button>
        {/* 模态框 */}
        <Modal
          title="添加类别信息"
          visible={userState.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(User);