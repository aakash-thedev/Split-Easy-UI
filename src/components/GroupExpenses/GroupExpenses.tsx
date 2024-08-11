import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import './GroupExpenses.css';

const GroupExpenses: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchGroupDetails(id).then((r) => {
        return r;
      })
    }
  }, [id])

  const fetchGroupDetails = async (id: string) => {
    try {
      const { data } = await ApiService().client.get(`http://localhost:8080/api/groups/${id}/details`);
      console.log("DATA", data, data.group, data.expenses);
    } catch (error) {
      console.log("Error fetching group details", error);
    }
  }

  return (
    <div>
      {id}
    </div>
  )
}

export default GroupExpenses;
