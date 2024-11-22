import { useContext } from "react";
import { Crudcontext } from "../../context";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { Content } from "antd/es/layout/layout";

const UsersCrud = () => {

    const {
        form,
        data,
        isModalOpen,
        isUpdate,
        columns,
        onFinish,
        showModal,
        handleOk,
        handleCancel
    } = useContext(Crudcontext)

    return (
        <>
        <Button type="primary" onClick={showModal}>
            New Usuario
        </Button>
        
        <Modal title="Create User"
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
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input type="password" placeholder="Password" />
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

export default UsersCrud;