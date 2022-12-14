import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AppHeader, AppSidebar } from 'src/components'
import CKEditor from 'react-ckeditor-component'
import Loader from '../loader/Loader'
import Alert from '../alert/Alert'
import { Button } from '@coreui/coreui'
import { CButton, CFormInput } from '@coreui/react'
// import ReactHtmlParser from 'react-html-parser'
const Message = () => {
  const [userData, setUserData] = useState([])
  const [userEmail, setUserEmail] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const [content, setContent] = useState('')
  const [loader, setLoader] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [user, setUser] = useState()
  function getUser() {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users`)
        .then((res) => {
          setUserData(res.data)
          setContent('')
        })
        .catch((error) => {
          setAlert(true)
          setAlertMessage(error.response.data.message)
          setTimeout(() => {
            setAlert(false)
          }, 2000)
        })
    } catch {
      console.log("can't get data from server please try again ")
    }
  }
  useEffect(() => {
    getUser()
    const data = JSON.parse(localStorage.getItem('userData'))
    setUser(data)
  }, [])
  const handleEmailAll = (e) => {
    setAllChecked(!allChecked)
    setIsCheck(userData.map((li) => li.email))
    if (allChecked) {
      setIsCheck([])
    }
  }
  const handleEmail = (e) => {
    const { checked, name } = e.target
    setIsCheck([...isCheck, name])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== name))
    }
  }

  const onChange = (evt) => {
    debugger
    console.log('onChange fired with event info: ', evt.editor.getData())
    var newContent = evt.editor.getData()
    // var netContent1 = ReactHtmlParser(newContent)
    setContent(newContent)
  }
  const handleSendMail = () => {
    var mailData = {
      users: isCheck,
      message: `${content}`,
    }
    if (isCheck.length !== 0) {
      if (content !== '') {
        try {
          axios
            .post(`${process.env.REACT_APP_API_URL}/sendmailtousers`, mailData)
            .then((res) => {
              setContent('')
              console.log(res.data)
              setLoader(true)
              setAllChecked(false)
              setTimeout(() => {
                setLoader(false)
                setAlert(true)
                setAlertMessage(res.data.message)
              }, 2000)

              setTimeout(() => {
                setAlert(false)
              }, 3000)
              setIsCheck([])
              setContent('')
            })
            .catch((error) => {
              setAlert(true)
              setAlertMessage(error.response.data.message)
              setTimeout(() => {
                setAlert(false)
              }, 2000)
            })
        } catch {
          console.log("can't get data from server please try again ")
        }
      } else {
        setAlert(true)
        setAlertMessage('please write a message')
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      }
    } else {
      setAlert(true)
      setAlertMessage('please choose the User')
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    }
  }
  const onBlur = (evt) => {
    // console.log("onBlur event called with event info: ", evt);
  }

  const afterPaste = (evt) => {
    // console.log("afterPaste event called with event info: ", evt);
  }
  const handleSearchItems = (e) => {
    setFilterValue(e.target.value)
  }

  return (
    <div>
      <AppSidebar />
      <Loader isLoader={loader} />
      <Alert isVisible={alert} message={alertMessage} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dashboardPage">
        <div className="dashboardPage__root">
          <AppHeader />
          <div className="dashboardPage__inner">
            <div className="custom-search">
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                feedbackInvalid="Please provide a valid email."
                id="validationCustom03"
                required
                value={filterValue}
                placeholder="Search"
                onChange={handleSearchItems}
                name="search"
              />
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onClick={() => setFilterValue('')}
              />
            </div>
            <div className="massageList">
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div className="massageList__checkbox rounded bg-white">
                  <div className="dashboardPage__head">
                      <h1 className="dashboardPage__title">User List</h1>
                    </div>
                    <div className="form-check">
                      <input
                        onChange={handleEmailAll}
                        className="form-check-input"
                        type="checkbox"
                        value={allChecked}
                        checked={allChecked}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        All Select
                      </label>
                    </div>
                 
                    {userData
                      ?.filter((option) =>
                        `${option.email}`.toLowerCase().includes(filterValue.toLowerCase()),
                      )
                      .map((data) => {
                        return (
                          <>
                            {user.id != data.id ? (
                              <div className="form-check">
                                <input
                                  onChange={handleEmail}
                                  className="form-check-input"
                                  name={data.email}
                                  type="checkbox"
                                  value=""
                                  checked={isCheck.includes(data.email) || false}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                  {data.email}
                                </label>
                              </div>
                            ) : (
                              ''
                            )}
                          </>
                        )
                      })}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-8">
                  <div className="p-4 rounded bg-white">
                    <CKEditor
                      activeclassName="p10"
                      content={content}
                      events={{
                        blur: onBlur,
                        afterPaste: afterPaste,
                        change: onChange,
                      }}
                      config={{
                        extraAllowedContent: 'div(*)',
                        allowedContent: false,
                      }}
                    />
                    <CButton
                      className="bg-darkGreen border-darkGreen mt-3"
                      onClick={handleSendMail}
                    >
                      Send
                    </CButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
