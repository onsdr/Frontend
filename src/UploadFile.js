import React from 'react'
import DropboxChooser from 'react-dropbox-chooser'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import logoDrop from './dropboxicon.png'
import logoUpload from './Capture.PNG'
import './upload.css'

const APP_KEY = 'k0sb2yxpu690any'

function UploadFile() {
  const [url, setUrl] = React.useState('')
  const notify = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  const notifyError = (msg) =>
    toast.error(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  const notifyInfo = () =>
    toast.info('Please wait!!!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  function handleSuccess(files) {
    setUrl(files[0].thumbnailLink)
    console.log(url)

    notifyInfo()
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/files',
      data: {
        title: files[0].link,
        content: files[0]?.name,
      },
    })
      .then((response) => notify(response.data.message))
      .catch((error) => {
        notifyError('Failed to upload your file, please try again !! ')
      })
  }

  const changefile = async (e) => {
    const file = e.target.files[0]
    console.log('local files', file)
    const base64 = await convertBase64(file)
    notifyInfo()
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/files',
      data: {
        title: base64,
        content: e.target.files[0]?.name,
      },
    })
      .then((response) => {
        notify(response.data.message)
      })
      .catch((error) => {
        notifyError('Failed to upload your file, please try again !! ')
      })
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <div className={'classes.root'}>
      <ToastContainer />
      <CardContent>
        <h4 className={'title'}>Upload now your file</h4>
        <div>
          <Card className={'cardgrey'} variant='outlined'>
            <div className={'bordercard'}>
              <img
                className={'uploadIcon'}
                id='chooser-image'
                src={logoUpload}
              />
              <div className={'content'}>
                <label for='file' className={'labelfile'}>
                  UPLOAD YOUR GRAPHIC FILE HERE
                </label>
                <input
                  id='file'
                  className={'inputfile'}
                  type='file'
                  name='file_local'
                  onChange={(e) => changefile(e)}
                />
                <DropboxChooser
                  appKey={APP_KEY}
                  success={handleSuccess}
                  cancel={() => console.log('closed')}
                  multiselect={true}
                >
                  <p className={'titleDrop'}>or upload from</p>
                  <img
                    className={'dropIcon'}
                    id='chooser-image'
                    src={logoDrop}
                  />
                </DropboxChooser>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </div>
  )
}

export default UploadFile
