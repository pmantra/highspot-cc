import React from 'react'
import HSCardGroup from '../components/HSCardGroup';

/**
 * Container for App Body
 * @param {*} param0
 */
const AppBody = ({cards, showInitialLoading, layout}) => {
    return (
        <div className='app-body'>
            <HSCardGroup
                cards={cards}
                loading={showInitialLoading}
                layout={layout}/>
        </div>
    );
}

export default AppBody;