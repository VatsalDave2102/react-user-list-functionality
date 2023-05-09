import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div className='loader d-flex align-items-center justify-content-center' style={{marginTop: '70px'}}>
    <Spinner animation="border" role="status" >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <h4 style={{marginLeft:'10px', marginBottom: '0'}}>Fetching users...</h4>
    </div>
     
  );
}

export default Loader;