import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import axios from 'axios';

const Confirm = () => {
    let { id } = useParams();

    useEffect(() => {
        axios.put( `${process.env.REACT_APP_API_URL}/auth/user/` + id, {
            status:"active"
        }
        ).then((res) => {
          })
    }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Confirmation for your account</h1>
                  <p>Your account is activated</p>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Signin</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Signin
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Confirm
