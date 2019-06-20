import React from 'react';
import {
    Form,
    Input,
    Upload,
    Button,
    Icon,
    message
  } from 'antd'
import {connect} from 'react-redux'

class CategoryForm extends React.Component {

  render(){
    const {getFieldDecorator} = this.props.form;
    const props = {
        name: 'file',
        action: 'http://134.175.154.93:8099/manager/file/upload',
        headers: {
          authorization: 'authorization-text',
        },
        onChange:(info)=> {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            let resp = info.file.response.data;
            console.log(resp);
            let id = "http://134.175.154.93:8888/"+resp.groupname+"/"+resp.id;
            //将id设置到表单
            this.props.form.setFieldsValue({
              icon:id
            })
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    getFieldDecorator('id')
    getFieldDecorator('name')
    getFieldDecorator('icon')
    return (
      <div className="category_form">
        <Form>
          <Form.Item label="分类名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input category name!' }],
            })(
              <Input placeholder="categoryName" />, 
            )}
          </Form.Item>
          <Form.Item label="图片上传">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        </Form>
      </div> 
     )
  }
}

const mapPropsToFields = (props) =>{
  let obj = {};
  for(let key in props.category){
    obj[key] = Form.createFormField({
      value: props.category[key]
    })
  }
  return obj;
}
export default Form.create({mapPropsToFields})(connect(state=>state)(CategoryForm));