import React from 'react'
import * as Styled from './style'

export const MenuButton: React.RefForwardingComponent<{},{isOnTop: boolean, toggleMenu: Function, isOpen: boolean, ref?: React.RefObject<{}>}> =
  React.forwardRef(({isOnTop, toggleMenu, isOpen}, ref) =>  
    (
      <Styled.topRightHamburger ref={ref} onClick={toggleMenu}>
          <Styled.nav checked={isOpen}/>
          <Styled.navBtn>
          <Styled.navIcon isOnTop={isOnTop}/>
          </Styled.navBtn>          
      </Styled.topRightHamburger>
    ))