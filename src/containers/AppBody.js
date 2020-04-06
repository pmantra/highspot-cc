import React from 'react'
import HSCardGroup from '../components/HSCardGroup';

const AppBody = ({cards, showInitialLoading, layout}) => {
    return (
        <div className='app-body'>
            <HSCardGroup cards={cards} loading={showInitialLoading} layout={layout}/>
        </div>
    );
}

export default AppBody;