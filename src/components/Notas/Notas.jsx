import axios from "axios";
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Table } from "antd";
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";

const Notas = () => {

    

    const [form] = useForm()
    const [data, setData] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdate, setIstUpdate] = useState(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Note',
            dataIndex: 'nota',
            key: 'nota',
        },
        {
            title: 'Name',
            render: (id, value) => {
            return value.User.name
            }
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => {
                return value.slice(0, 10)
            } 
        },
        {
            title: 'Update',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value) => {
                return value.slice(0, 10)
            } 
        },
        {
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
                            onConfirm={(value) => confirm(row.id)}
                        >
                        <DeleteFilled>
                            Delete
                        </DeleteFilled>
                        </Popconfirm>
                    </>
                    )
                }
        }
    ]



    const getDataUser = async () => {
        const response = await axios.get('http://localhost:3001/users')
        const copiaResponse = [...response.data]
        const  obtener = copiaResponse.map(item => ({value:item.id, label:item.name}))
        setDataUser(obtener)
    }

    //Axios Get para obtener un Usuario

    const getData = async () => {
        let response = await axios.get('http://localhost:3001/notas')
        setData(response.data)
    }

    //Axios Get para Actualizar un Usuario
    const showModalEdit = async (id) => {
        setIstUpdate(true)
        setIsModalOpen(true)
        const response = await axios.get(`http://localhost:3001/notas/${id}`)
        const obtener = response.data
        const obtenerAll = {nota:obtener.nota, user_id:obtener.User.id, id:obtener.id}
        form.setFieldsValue(obtenerAll)
    }

    //Axios Post y Put Para crear un Usuario
        const onFinish = async (values) => {
            const idNotas = values.id;
            const {id, ...data} = values
            if(isUpdate){
            await axios.put(`http://localhost:3001/notas/${idNotas}`, data)
            }else{
            await axios.post('http://localhost:3001/notas', values)
            
            }
            getData()
            form.resetFields()
            handleCancel()
        };


        //Axios Delete
        const confirm = async (id) => {
        await axios.delete(`http://localhost:3001/notas/${id}`)
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
        getDataUser()
    }, [])

    return (
        <>
        <Content style={{ marginTop: 30}}> 
        <Button  onClick={showModal}>
            New Nota
        </Button>

        <Modal title="Create Note"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={''}
        >
            <Form
            form={form}
            onFinish={onFinish}>
                <Form.Item
                name="nota"
                rules={[
                    {
                    required: true,
                    message: 'Please input your nota!',
                    },
                ]}
                >
                <Input type="number"  placeholder="nota" />
                </Form.Item>

                <Form.Item name="user_id">
                <Select
                    placeholder="Select a user"
                    optionFilterProp="label"
                    options={dataUser}
                />
                </Form.Item>

                <Form.Item
                    name='id'
                    hidden
                >
                    <Input type="text"/>
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
        </Content>

        </>
    );
}

export default Notas;