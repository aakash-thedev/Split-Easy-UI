import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IExpense } from "../../models/Expense";
import { IGroup } from "../../models/Group";
import ApiService from "../../services/ApiService";
import './GroupExpenses.css';

const GroupExpenses: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState<IGroup>();
  const [expenses, setExpenses] = useState<IExpense[]>([]);

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
      setGroupDetails(data.group);
      setExpenses(data.expenses);
    } catch (error) {
      console.log("Error fetching group details", error);
    }
  }

  return (
    <div className="group-details-container">
      <div className="group-details-header">
        <div className="group-details-header-top">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/groups')}> Back </span>

          <span className="group-title"> {groupDetails?.name} </span>

          <span className="group-details-categories">
            {
              groupDetails?.categories.map((category) => {
                return <span> {category} </span>
              })
            }
          </span>

        </div>

        <div className="group-details-header-bottom">
          <span className="group-details-description"> {groupDetails?.description} </span>
          <div className="group-details-members">
            {
              groupDetails?.members.map((member) => {
                return <span className="group-details-member-pill"> {member.name} </span>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupExpenses;
