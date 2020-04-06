import React, { useState } from 'react'
import { Menu, Form, Icon } from 'semantic-ui-react';

const AppHeader = ({ handleSearch, pageDispatch, layoutDispatch }) => {
    const [searchText, setSearchText] = useState('');
    const handleChange = (e, {value}) => {
        setSearchText (value);
    }

    const handleItemClick = (e, { name }) => {
        layoutDispatch ({ type: name.toUpperCase() });
    }

    const handleOnSubmit = () => {
        handleSearch (searchText);
        pageDispatch ({ type: 'RESET_PAGE' });
    }

    return (
        <div className='app-header'>
            <Menu fixed='top' inverted size='small' borderless fluid>
                <Menu.Menu position='left'>
                    <Menu.Item>
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Input icon='search'
                                value={searchText}
                                placeholder='Search by name and press enter' inverted
                                onChange={handleChange}/>
                        </Form>
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='relaxed_layout'
                        onClick={handleItemClick}>
                            <Icon name='columns' />
                    </Menu.Item>
                    <Menu.Item
                        name='default_layout'
                        onClick={handleItemClick}>
                            <Icon name='table' />
                    </Menu.Item>
                    <Menu.Item
                        name='compact_layout'
                        onClick={handleItemClick}>
                        <Icon name='grid layout' />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
}

export default AppHeader;