import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import HSCard from './HSCard';
import HSCardPlaceholder from './HSCardPlaceholder';

const HSCardGroup = ({ cards, loading, layout }) => {
    if(loading) {
        return (
            <Card.Group centered stackable
                itemsPerRow={5} textAlign='center'>
                {[...Array(10).keys()].map((item, index) => (
                    <HSCardPlaceholder key={index}/>
                ))}
            </Card.Group>
        )
    }
    else if (cards.length === 0) {
        return (
            <Message>
                <Message.Header>No Cards To Show</Message.Header>
                <p>
                    There are no cards matching the search key
                </p>
            </Message>
        )
    }
    return (
        <Card.Group centered stackable
            itemsPerRow={layout} textAlign='center'>
            {cards && cards.map(item => (
                <HSCard key={item.id} {...item} />
            ))}
        </Card.Group>
    )
}

export default HSCardGroup;