import { useNavigate } from 'react-router-dom'
import ButtonCom from '../../sharedComponent/ButtonCom'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",height:"100vh", flexDirection:"column"}}>
          <h1 style={{color:"red"}}>Page not found</h1>
          <br/>
          <ButtonCom onClick={ ()=> navigate(-1)} text='Back'/>
    </div>
  )
}

export default PageNotFound
