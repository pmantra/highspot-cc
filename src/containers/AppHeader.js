import React, { useState } from 'react'
import { Menu, Form, Icon, Header } from 'semantic-ui-react';

/**
 * Container for App header
 * Contains the form input for searching with name and layout controls to switch card layout in the grid
 * @param {*} param
 */
const AppHeader = ({ cardCount, totalCount, handleSearch, clearSearch, setLayout }) => {
    const [searchText, setSearchText] = useState('');

    const handleChange = (e, {value}) => {
        setSearchText (value);
    }

    const handleItemClick = (e, { name }) => {
        setLayout (name.toUpperCase());
    }

    const handleOnSubmit = () => {
        if (searchText.trim() !== '') {
            handleSearch (searchText);
        }
    }

    const handleClearSearch = () => {
        setSearchText ('');
        clearSearch ();
    }

    return (
        <div className='app-header'>
            <Menu fixed='top' inverted size='small' borderless fluid>
                <Menu.Menu position='left'>
                    <Menu.Item>
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Input
                                icon={{ name: searchText ? 'close' : 'search', link: true,
                                        onClick: handleClearSearch, size: 'large' }}
                                value={searchText}
                                placeholder='Search by name' inverted
                                onChange={handleChange}/>
                        </Form>
                    </Menu.Item>
                    <Menu.Item>
                        <Header inverted as='h4'>Showing {cardCount} of {totalCount} Cards</Header>
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