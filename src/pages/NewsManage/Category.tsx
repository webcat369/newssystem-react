import React,{useState,useEffect,useRef,useContext} from 'react'
import { Table,Button,Modal,Form,Input} from 'antd';
import { DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { categories,undateCategories,deleteCategories } from 'api/categories'

const { confirm } = Modal

export default function Category() {
  const [dataSource,setdataSource] = useState([] as any)

  // 初始化新闻分类数据
  useEffect(() => {
    getCategories()
  },[])

  const getCategories = async () => {
    const list = await categories()
    setdataSource(list)
  }

  // 表单列
  const columns:any = [
    {
      title:'ID',
      dataIndex:'id',
      render:(id:number) => {
        return <b>{id}</b>
      }
    },
    {
      title:'分类名称',
      dataIndex:'title',
      onCell:(record:any) => (
        {
          record,
          editable: true,
          dataIndex:'title',
          title:'分类名称',
          handleSave:handleSave,
        }
      )
    },
    {
      title:'操作',
     render:(item:any) => {
      return <div>
        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}/>
      </div>
     }
    }
  ]

  // 修改数据保存，推送后端
  const handleSave = (record:any) => {
    console.log(record,'修改后的数据')
    setdataSource(dataSource.map((item:any) => {
      if(item.id === record.id){
        return {
          ...item,
          title:record.title,
          value:record.title
        }
      }
      return item
    }))
    undateCategories(record.id,{
      title:record.title,
      value:record.title
    })
  }

  // 确认删除
  const confirmMethod = (item:any) => {
    console.log(item,'删除');
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk(){
        deleteNewsCategories(item)
      },
      onCancel(){}
    })
  }

  //删除数据
  const deleteNewsCategories = async (item:any) => {
    dataSource.filter((data:any) => data.id !== item.id)
    setdataSource([...dataSource])
    await deleteCategories(item.id)
  }

  // 参考https://ant.design/components/table-cn/#components-table-demo-edit-cell
  // 使用Context来实现跨层级的组件数据传递
  const EditableContext = React.createContext(null as any);

  const EditableRow = ({ index, ...props } :any) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }:any) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null as any);
    const form = useContext(EditableContext)!;
  
    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        console.log('当前的条目：',record);
        console.log('修改后的：',values);

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title}是必须的!`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  }

  return (
    <div>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey={item => item.id}
        pagination={{
          pageSize: 5
        }}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }}
      />
    </div>
  )
}