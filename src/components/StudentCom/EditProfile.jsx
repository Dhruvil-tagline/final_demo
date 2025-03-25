import { useState } from 'react'
import { toast } from 'react-toastify';
import { putRequest } from '../../utils/api';
import { validateName } from '../../utils/validation';
import InputCom from '../../shared/InputCom';
import ButtonCom from '../../shared/ButtonCom';
import './studCss/student.css'
import Loader from '../../shared/Loader';
import { useDispatch, useSelector } from 'react-redux';


const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setText(e.target.value);
    setError(validateName(e.target.value));
    if (e.target.value.trim() === user?.user?.name.trim()) {
      setError('Updated name is same as actual name')
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    try {
      setLoading(true);
      const response = await putRequest('student/studentProfile', { name: text }, { 'access-token': token });
      if (response.statusCode === 200) {
        toast.success('Name updated Successfully');
        dispatch({ type: "CHANGE_NAME", payload: text });
      }
      else {
        toast.error(response?.message || 'Error occurred');
      }
    } finally {
      setLoading(false);
      setText('');
    }
  }

  return (
    <div style={{ maxWidth: '600px', width: '100%', margin: "30px 0px", padding: "20px", border: '1px solid gray', borderRadius: "10px", }}>
      {loading && <Loader />}
      <h1 className='heading'>Edit Profile</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px 0px" }}>
        <p>Name: {user?.user?.name}</p>
        <p>Email: {user?.user?.email}</p>
      </div>
      <hr className='horizontalRule' />
      <form style={{ marginTop: "10px" }}>
        <p>Change Name</p>
        <span className='error'>{error}</span>
        <InputCom type='text' name='name' id='name' value={text} onChange={handleChange} placeholder='Enter your name...' />
        <ButtonCom text='Update name' onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default EditProfile
