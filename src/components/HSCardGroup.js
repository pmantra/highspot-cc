import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import HSCard from './HSCard';
import HSCardPlaceholder from './HSCardPlaceholder';

/**
 * This is a card holder component that shows all the cards
 * Uses semantic card.group component with built in support to switch to stacked display on mobile screens
 */
const HSCardGroup = ({ cards, loading, layout }) => {
    if(loading === true && cards.length === 0) {
        return (
            <Card.Group centered stackable
                itemsPerRow={layout} textAlign='center'>
                {[...Array(10).keys()].map((item, index) => (
                    <HSCardPlaceholder key={index}/>
                ))}
            </Card.Group>
        )
    }
    if (loading === false && cards.length === 0) {
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