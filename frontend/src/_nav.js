import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilInstitution,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import {  CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Tutorial',
    to: '/tutorial',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Classes',
  //   to: '/classes',
  //   icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
  {
    component: CNavItem,
    name: 'Setting',
    to: '/setting',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  
]

export default _nav
