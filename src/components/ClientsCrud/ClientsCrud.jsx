import { Button, Col, Form, Input, Modal, Popconfirm, Row, Table } from "antd";
import axios from "axios";
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";


const ClientsCrud = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdate, setIstUpdate] = useState(false)
    

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname',
        }, 
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (isActiveValue) => {
                return  isActiveValue ? 'Activo' : 'Inactivo'
                }
        },{
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },{
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => {
                return value.slice(0, 10)
            } 
        },{
            title: 'Options',
            dataIndex: 'update',
            key: 'update',
            render: (value, row) => {
                return (
                    <>
                        <EditFilled  
                                style={{marginRight: '4px'}}
                                color="primary"
                                variant="dashed"
                                onClick={() => showModalEdit(row.id)}
                            >
                            Edit
                        </EditFilled>
                        <Popconfirm
                            title="Delete the User"
                            description="Are you sure to delete this User?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => confirm(row.id)}
                        >
                        <DeleteFilled 
                            color="danger"
                            variant="dashed"
                        >
                            Delete
                        </DeleteFilled>
                        </Popconfirm>
                    </>    
                    )
                }
        }
    ]

    //Axios Get para obtener un Usuario
    const getData = async () => {
        let response = await axios.get('http://localhost:3001/clients') 
        setData(response.data)
    }

    //Axios Get para Actualizar un Usuario
    const showModalEdit = async (id) => {
        setIstUpdate(true)
        setIsModalOpen(true)
        const response = await axios.get(`http://localhost:3001/clients/${id}`)
        form.setFieldsValue(response.data)
    }

    //Axios Post y Put Para crear un Usuario
        const onFinish = async (values) => {
            const idClients = values.id;
            const {id, ...data} = values
            if(isUpdate){
            await axios.put(`http://localhost:3001/clients/${idClients}`, data)
            }else{
            await axios.post('http://localhost:3001/clients', values)
            }
            getData()
            form.resetFields()
            handleCancel()
        };

        //Axios Delete
        const confirm = async (id) => {
        await axios.delete(`http://localhost:3001/clients/${id}`)
        getData()
        }


    //Funciones Modal
    const showModal = () => {
        setIsModalOpen(true);
        setIstUpdate(false)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };


    // Para renderizar GetData
    useEffect( () => {
        getData()
    }, [])

    return (
        <>
        <Button type="primary" onClick={showModal}>
        New Cliente
      </Button>
      
      <Modal title="Create Clients"
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={''}
      >
        <Form 
        form={form}
        onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input type="text"  placeholder="name" />

            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your Lastname!',
                },
              ]}
            >
              <Input type="text" placeholder="Lastname" />
            </Form.Item>

            <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your Address!',
              },
            ]}
          >
            <Input type="text" placeholder="Address" />
            </Form.Item>

            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your Type!',
                },
              ]}
            >
              <Input type="text" placeholder="Type" />
            </Form.Item>

            <Form.Item
                name="id"
                hidden
                >
                <Input type="text" />
            </Form.Item>

            <Form.Item>
              {
                isUpdate ?
                (
                    <Button block type="primary" htmlType="submit">
                    update
                    </Button>
                )
                :
                (
                    <Button block type="primary" htmlType="submit">
                    create
                    </Button>
                )
              }
            </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col md={24} style={{display: 'flex', justifyContent: 'center'}}>
          <Table rowKey={'id'} dataSource={data} columns={columns} />
        </Col>
      </Row>
        </>
    );
}

export default ClientsCrud;