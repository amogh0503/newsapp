import loading from './loading.gif'

const Spinner = () => {
    return (
        <div className='text-center'>
            <img src={loading} alt="loading" sizes='small' style={{ width: '10%', height: 'auto' }} />
        </div>
    )
}

export default Spinner