
import {NavLink} from 'react-router-dom'
import { Menu } from "antd";
import { Content } from "antd/es/layout/layout";

const Navbar = () => {

    const items = ['Users', 'Clients', 'Notas'].map((key, index) => (
        {
            key: index,
            label: (<NavLink to={`/${key}`}>
                {key}
            </NavLink>)
        }
    ) )
    
    return (
        <>
        <Content>
        <Menu
        style={{flex: 1, minWidth: 1}}
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['0']}
        items={items}
        />
        </Content>
        </>
    );
}

export default Navbar;