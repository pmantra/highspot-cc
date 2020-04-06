import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const HSCardPlaceholder = () => {
    return  (
        <Card>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                        <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
            <Card.Content extra>
                <Placeholder>
                    <Placeholder.Line length='medium' />
                </Placeholder>
            </Card.Content>
        </Card>
    )
}

export default HSCardPlaceholder;