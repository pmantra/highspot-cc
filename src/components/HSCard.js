import React from 'react'
import { Card, Image, Icon, Popup, List } from 'semantic-ui-react'
import { PLACEHOLDER_IMAGE } from '../utils/constants';

/**
 * Card component containing the image and the card attributes from api
 * Uses semantic card component
 * @param {*} props
 */
export default function ImageCard (props) {
    const {name, imageUrl, text, set, type, cost, health, power} = props;
    return (
        <Card raised link>
            <Image src={PLACEHOLDER_IMAGE} className='card-image'
                wrapped ui={false} data-url={imageUrl}/>
            <Card.Content>
                <Card.Header className='card-header'>{name}</Card.Header>
                <Card.Description>
                    <span className='card-description'>{set ? set.name : ''}</span>
                </Card.Description>
                <Card.Meta>
                    <span className='card-meta'>{type}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <List horizontal>
                    {cost &&
                        <List.Item as='a'>
                            <Popup content='Cost' hideOnScroll
                                trigger={<Icon name='bitcoin' as='i' color='yellow'/>} />
                        {cost}
                        </List.Item>
                    }
                    {health &&
                        <List.Item as='a'>
                            <Popup content='Health' hideOnScroll
                                trigger={<Icon name='heart' as='i' color='red'/>} />
                            {health}
                        </List.Item>
                    }
                    {power &&
                        <List.Item as='a'>
                            <Popup content='Power' hideOnScroll
                                trigger={<Icon name='bolt' as='i' color='violet'/>} />
                            {power}
                        </List.Item>
                    }
                    {text &&
                        <List.Item as='a'>
                            <Popup content={text} hideOnScroll inverted
                                trigger={<Icon name='info circle' as='i' color='blue'/>} />
                        </List.Item>
                    }
                </List>
            </Card.Content>
        </Card>
    )
}