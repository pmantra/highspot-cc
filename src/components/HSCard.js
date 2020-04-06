import React from 'react'
import { Card, Image, Icon, Popup, List } from 'semantic-ui-react'
import { PLACEHOLDER_IMAGE } from '../utils/constants';

export default function ImageCard (props) {
    const {name, imageUrl, text, set, type, cost, health, power} = props;
    return (
        <Card>
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
                        <List.Item>
                            <Icon name='bitcoin' as='i' color='yellow'/>{cost}
                        </List.Item>
                    }
                    {health &&
                        <List.Item>
                            <Icon name='heart' as='i' color='red'/>{health}
                        </List.Item>
                    }
                    {power &&
                        <List.Item>
                            <Icon name='bolt' as='i' color='violet'/>{power}
                        </List.Item>
                    }
                    {text &&
                        <List.Item>
                            <Popup content={text} hideOnScroll inverted
                                trigger={<Icon name='info circle' as='i' color='blue'/>} />
                        </List.Item>
                    }
                </List>
            </Card.Content>
        </Card>
    )
}