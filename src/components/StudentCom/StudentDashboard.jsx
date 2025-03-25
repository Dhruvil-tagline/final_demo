import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '../../SharedComponent/Table';
import { getRequest } from '../../utils/api';
import ButtonCom from '../../SharedComponent/ButtonCom';
import { useSelector } from 'react-redux';
const tableHeader = ['Index', 'Subject', 'Email', 'Notes', 'Action'];

const StudentDashboard = () => {
  const user = useSelector((state) => state.auth);
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response = await getRequest('student/studentExam', user?.token);
        if (response.statusCode === 200) {
          setExam(response.data);
        }
      }
      finally {
        setLoading(false);
      }
    }
    fetchData()
  }, []);
  const tableData = useMemo(() => {
    return exam.map((val, index) => ({
      Index: index + 1,
      Subject: val.subjectName,
      Email: val.email,
      Notes: val.notes.join(', '),
      Action: !!val?.Result?.length ? (<ButtonCom text='View result' onClick={() => navigate('/result', { state: val })} />)
        : (<ButtonCom text='Start Exam' onClick={() => navigate('/examForm', { state: { id: val._id, subjectName: val.subjectName, notes: val.notes } })} />)
    }))
  }, [exam])
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "30px", color: "rgb(18, 219, 206)", marginBottom: "20px", textShadow: "12px 12px  4px black" }}>
        <h1>Welcome   {user?.user?.name}</h1>
        <h1>Role: {user?.user?.role}</h1>
      </div>
      <div  style={{maxWidth:"1100px", margin:"0 auto"}}>        
        <Table tableData={tableData} tableHeader={tableHeader} isLoading={loading} minWidth={'900px'} />
       </div>
    </div>
  )
}

export default StudentDashboard
