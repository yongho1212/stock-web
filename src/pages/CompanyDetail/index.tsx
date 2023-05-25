import React from 'react'
import { useParams } from 'react-router-dom'
import CompanyDetailInfo from '../../components/CompanyDetailInfo';



const CompanyDetail = () => {
    const { id } = useParams();


  return (
    <div>
        <CompanyDetailInfo corpCode={id} />
    </div>
  );
};

export default CompanyDetail;