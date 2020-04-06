import React from 'react'
import HSCardGroup from '../components/HSCardGroup';

const AppBody = ({cards, showInitialLoading}) => {
    return (
        <div className='app-body'>
            <HSCardGroup cards={cards} loading={showInitialLoading} />
        </div>
    );
}

export default AppBody;