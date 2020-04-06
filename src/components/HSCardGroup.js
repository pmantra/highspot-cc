import React from 'react';
import { Card } from 'semantic-ui-react';
import HSCard from './HSCard';
import HSCardPlaceholder from './HSCardPlaceholder';

const HSCardGroup = ({ cards, loading }) => {
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
    return (
        <Card.Group centered stackable
            itemsPerRow={5} textAlign='center'>
            {cards && cards.map(item => (
                <HSCard key={item.id} {...item} />
            ))}
        </Card.Group>
    )
}

export default HSCardGroup;