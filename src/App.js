import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import DropboxChooser from 'react-dropbox-chooser'
import axios from 'axios'
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
    marginTop: 200,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))
const APP_KEY = 'k0sb2yxpu690any'

function App() {
  const [url, setUrl] = React.useState('')
  function handleSuccess(files) {
    setUrl(files[0].thumbnailLink)
    console.log(url)
  }
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    console.log('set value', newValue)
    console.log('value', value)

    setValue(newValue)
  }

  const changefile = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)

    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/files',
      data: {
        title: base64,
        content: e.target.files[0]?.name,
      },
    })
      .then((response) => console.log('resp', response))
      .catch((error) => console.error(error))
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
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
      >
        <Tab label='JOB 1 ' />
        <Tab label='JOB 2' />
      </Tabs>

      <TabPanel value={value} index={0}>
        <input type='file' name='file_local' onChange={(e) => changefile(e)} />
        <DropboxChooser
          appKey={APP_KEY}
          success={handleSuccess}
          cancel={() => console.log('closed')}
          multiselect={true}
        >
          <button>dropbox</button>
        </DropboxChooser>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  )
}

export default App
