import { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" sizes='small' style={{ width: '10%', height: 'auto' }}/>
      </div>
    )
  }
}

export default Spinner