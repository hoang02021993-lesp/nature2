import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './admin.module.css';
import FormAdd from './FormAdd';
import Data from './Data';
import ImageUploader from './Test';

function AdminPage(props) {
  return (
    <div className={styles.container}>
      <FormAdd />
      {/* <ImageUploader /> */}
      <Data data={props.data} />
    </div>
  )
}

AdminPage.propTypes = {}

export default AdminPage
