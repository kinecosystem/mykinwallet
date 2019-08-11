import * as React from 'react';

//@ts-ignore
import Linkdin from '../../../assets/linkedin.svg'
//@ts-ignore
import Mediem from '../../../assets/medium.svg'
//@ts-ignore
import Reddit from '../../../assets/reddit.svg'
//@ts-ignore
import Subscribe from '../../../assets/Subscribe_arrow.svg'

export const getIcon = (type: string): JSX.Element => {
    switch(type) {
        case 'reddit': return <Reddit/>;
        case 'linkedin': return <Linkdin/>;
        case 'medium': return <Mediem/>;
        case 'Subscribe': return <Subscribe/>
    }
}