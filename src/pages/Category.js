import React from 'react'
import {
  Button,
  Table,
  Icon,
  Modal,
  Collapse
} from 'antd'
import {connect} from 'react-redux'
import CategoryForm from './CategoryForm'
import { 
  reloadCategory, 
  deleteCatecory, 
  openModal,
  saveOrUpdateCategory,
  closeModal
} from '../store/categoryReducer';

class Category extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      category:null
    }
  }

  componentWillMount(){
    this.props.dispatch(reloadCategory())
  }

  delHandler(id){
    this.props.dispatch(deleteCatecory(id))
  }

  editHandler(record){
    this.setState({
      category:record
    })
    this.props.dispatch(openModal())
  }

  handleOk = e =>{
    this.form.validateFields((err,values) => {
      if(!err) {
        this.props.dispatch(saveOrUpdateCategory(values))
      }
    });
  }

  handleCancel = e =>{
    this.props.dispatch(closeModal())
  }

  toSave(){
    this.setState({
      category:{}
    })
    this.props.dispatch(openModal())
  }

  categoryFormRef=(form)=>{
    this.form = form;
  }

  render(){
    let {categoryState} = this.props;
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        width:"200px"
      },
      {
        title: '缩略图',
        dataIndex: 'icon',
        render:(text,record)=>{
          return (
            <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={record.icon} alt=""></img>
          )
        },
        width:"200px"
      },
      {
        title: '操作',
        dataIndex: '',
        width:"200px",
        render: (text,record) => {
          return (
            <div>
            <Icon type="delete" onClick={this.delHandler.bind(this,record.id)}/>
            &nbsp;
            <Icon type="edit" onClick={this.editHandler.bind(this,record)}/>
          </div>
          )
        } 
      },
    ];
    return (
      <div className="category">
        <h2>分类管理</h2>
        <div className="btns">
          <Button onClick={this.toSave.bind(this)}>添加</Button> &nbsp;
          <Button type="danger" onClick={this.batchDelete}>批量删除</Button>
        </div>
        {/* 表格 */}
        <Table 
          size="small"
          rowKey="id" 
          loading={categoryState.loading}
          columns={columns} 
          bordered={Collapse}
          dataSource={categoryState.list} 
        />
        {/* 模态框 */}
        <Modal
          title="添加类别信息"
          visible={categoryState.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CategoryForm ref={this.categoryFormRef} category={this.state.category} />
        </Modal>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return state;
}

export default connect(mapStateToProps)(Category);