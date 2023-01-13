import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {format} from 'date-fns';

function Data({ data }) {
  const [host, setHost] = useState('');

  useEffect(() => {
    setHost(`${window.location.protocol}//${window?.location?.host}/post/`);
  }, []);

  return (
    <div>
      <h2>Data</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.slug}>
              <td>{item.endpoint}</td>
              <td>{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}</td>
              <td>
                <button type="button" onClick={() => {
                  navigator.clipboard.writeText(`${host}${item.slug}`)
                }}>Copy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Data.propTypes = {}

export default Data
