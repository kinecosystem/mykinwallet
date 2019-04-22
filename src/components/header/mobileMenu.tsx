import React from 'react'
import * as Styled from './styles'

interface IProps {
    isOpen: boolean
    links: {
        name: string;
        url: string;
        type: string;
      }[]
    ref: React.Ref<{}>
}

export const MobileMenu = React.forwardRef(({isOpen, links}: IProps, ref) => {
    return (
        <Styled.navContainer isOpen={isOpen} ref={ref}>
            {links.filter(item => item.type === 'link').map(link =>
            <Styled.link 
                to={link.url} 
                key={link.name}>
                <Styled.navItem>
                        <Styled.navItemText >{link.name}</Styled.navItemText>
                </Styled.navItem>      
            </Styled.link>
            )}   
        </Styled.navContainer>
    )
})