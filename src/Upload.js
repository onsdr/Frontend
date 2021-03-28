import React from 'react'

import Card from '@material-ui/core/Card'

import './upload.css'
import Component from './Component.js'
import UploadFile from './UploadFile.js'

import Grid from '@material-ui/core/Grid'

function Upload() {
  const [value, setValue] = React.useState(false)

  function Greeting() {
    if (value) {
      return <Component />
    } else {
      return <UploadFile />
    }
  }
  React.useEffect(() => {
    console.log('value', value)
  })

  return (
    <div className={'classes.root'}>
      <h1>Upload area</h1>

      <Grid container>
        <Grid item xs={12} lg={1} md={1} sm={1}>
          <div onClick={() => setValue(false)} className={'jobLg'}>
            <h5 className={'jobTitleLg'}>Job 1</h5>
            <p className={'jobTitleLg'}>Flyer</p>
          </div>
          <div onClick={() => setValue(true)} className={'jobLg'}>
            <h5 className={'jobTitleLg'}>Job 2</h5>
            <p className={'jobTitleLg'}>Poster</p>
          </div>
        </Grid>
        <Grid item xs={12} lg={11} md={11} sm={11}>
          <Card className={'root'} variant='outlined'>
            <h4 className={'jobTitle'}>Select Job</h4>
            <div className={'job'}>
              <h5 className={'jobTitle'}>Job 1</h5>
              <p className={'jobTitle'}>Flyer</p>
            </div>
            <Greeting />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Upload
