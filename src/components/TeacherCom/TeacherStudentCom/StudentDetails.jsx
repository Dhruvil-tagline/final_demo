import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRequest } from '../../../utils/api';
import ButtonCom from '../../../CommonComponent/ButtonCom';
import Table from '../../../CommonComponent/Table';
import { useSelector } from 'react-redux';
import { studentTableHeader } from '../../../utils/staticObj';


const StudentDetails = () => {
    const { id } = useParams();
    const { token } = useSelector((state)=> state.auth);
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({});
    let index = 1;
    const tableData = studentData?.Result && studentData?.Result.map((val) => ({
        Index: index++,
        Subject: val.subjectName,
        Score: val.score,
        Rank: val.rank
    }))

    useEffect(() => {
        const fetchStudentDetails = async () => {
           try {
               setLoading(true)
               const response = await getRequest(`dashboard/Teachers/viewStudentDetail?id=${id}`, token);
               if (response.statusCode === 200) {
                   setStudentData(response.data[0]);
               }
           } 
           finally {
               setLoading(false);
            }
        };
        fetchStudentDetails();
    }, [id]);

    return (
        <div style={{display:"flex",justifyContent:"center", flexDirection:"column", alignItems:'center'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: "10px 30px", color:"rgb(18, 219, 206)", fontSize:"20px", maxWidth:"700px", width:'100%', flexWrap:"wrap", gap:"20px"}}>
            <p>Name: {studentData?.name}</p>
            <p>Email: { studentData?.email}</p>
            </div>
            <div style={{maxWidth:"900px", width:"100%", padding:"20px"}}>
                <Table tableHeader={studentTableHeader} tableData={tableData} isLoading={loading} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <ButtonCom text='Back' onClick={() => navigate(-1)} style={{ backgroundColor: '#f1c40f', color: '#121212', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} />
            </div>
        </div>


    )
}

export default StudentDetails
