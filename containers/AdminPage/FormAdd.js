import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './admin.module.css';
import Axios from 'axios';

function FormAdd(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  const onImport = () => {
    setIsLoading(true);
    Axios.post('/api/links', {
      url: url
    }).then(res => {
      if(res.data.success) {
        window.location.reload();
      } else {
        alert(res.data.message);
      }

      setIsLoading(false);
    });
  }

  return (
    <div>
      <div className={styles.formGroup}>
        <label htmlFor="url">URL:</label>
        <input type="text" className={styles.input} placeholder="Url..." value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div>
        <button type="button" onClick={onImport} className={`${styles.button} ${isLoading ? styles.buttonDisable : {}}`} disabled={isLoading}>Add</button>
      </div>
    </div>
  )
}

FormAdd.propTypes = {}

export default FormAdd
