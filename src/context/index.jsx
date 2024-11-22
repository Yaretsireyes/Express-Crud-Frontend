import { Button, Form, Popconfirm } from "antd";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import { useForm } from "antd/es/form/Form";


export const Crudcontext = createContext()

export const CrudProvider = ({children}) => {

    // Estados 
    const [data, setData] = useState([])
    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdate, setIstUpdate] = useState(false)

      //Columnas Tabla Users
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
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActiveValue) => {
      return  isActiveValue ? 'Activo' : 'Inactivo'
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
    ];

    //Metodos
     //Axios Get para obtener un Usuario
    const getData = async () => {
    let response = await axios.get('http://localhost:3001/users') 
    setData(response.data)
    }

  //Axios Get para Actualizar un Usuario
    const showModalEdit = async (id) => {
      setIstUpdate(true)
      setIsModalOpen(true)
      const response = await axios.get(`http://localhost:3001/users/${id}`)
      form.setFieldsValue(response.data)
    }


   //Axios Post y Put Para crear un Usuario
    const onFinish = async (values) => {
        const idUser = values.id;
        const {id, ...data} = values
        if(isUpdate){
          await axios.put(`http://localhost:3001/users/${idUser}`, data)
        }else{
          await axios.post('http://localhost:3001/users', values)
        }
        getData()
        form.resetFields()
        handleCancel()
    };

    //Axios Delete
    const confirm = async (id) => {
      await axios.delete(`http://localhost:3001/users/${id}`)
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



    ///////////////////////////////////////////////////////////////////
  




    return (
        <>
        
        <Crudcontext.Provider value={{
            //Users//
            form,
            data,
            isModalOpen,
            isUpdate,
            columns,
            onFinish,
            showModal,
            handleOk,
            handleCancel
        }}>
            {children}
        </Crudcontext.Provider>
        </>
    )
}