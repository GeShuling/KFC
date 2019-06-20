import React from 'react'
import {connect} from 'react-redux'
import {List,Form,Input,Button} from 'antd'
import {
    delMemo,
    saveMemo
} from '../store/memoReducer'

class Memo extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    
    delHandler(content){
        this.props.dispatch(delMemo(content))
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.dispatch(saveMemo(values.content))
            }
        });
    }

    render(){
        let {memoState} = this.props;
        let {getFieldDecorator} = this.props.form;
        return(
            <div className='memo'>
                <h2>备忘录管理(无ajax)</h2>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your content!' }],
                    })(
                        <Input placeholder="content"/>,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                    </Form.Item>
                </Form>
                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={memoState.list}
                    renderItem={item => {
                        return (
                            <List.Item actions={[<span>edit</span>, <span onClick={this.delHandler.bind(this,item)}>del</span>]}>
                                {item}
                            </List.Item>
                        )
                    }}
                />
            </div>
        )
    }

}

let mapStateToProps= (state)=>{
    return state;
}

export default Form.create()(connect(mapStateToProps)(Memo));