import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GROUP_CATEGORY_PROPERTIES } from "../../constants/GroupCategories";
import { IExpense } from "../../models/Expense";
import { IGroup } from "../../models/Group";
import ApiService from "../../services/ApiService";
import CustomDropdown, { ICustomDropdownOption } from '../CustomDropdown/CustomDropdown';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './GroupExpenses.css';

const GroupExpenses: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState<IGroup>();
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [users, setUsers] = useState<ICustomDropdownOption[]>([]);
  const [showUnequalSplit, setShowUnequalSplit] = useState(false);
  const INITIAL_FORM_DATA_VALUE = {
    name: '',
    description: '',
    amount: '',
    splitBetween: [],
    group: id,
    isEqualSplit: true,
    customAmounts: {},
  }
  const [formData, setFormData] = useState(INITIAL_FORM_DATA_VALUE);
  const [settleExpenseResult, setSettleExpenseResult] = useState("");
  const [loadResult, setLoadResult] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);


  useEffect(() => {
    if (id) {
      fetchGroupDetails(id).then((r) => r);
    }
  }, [id]);

  const fetchGroupDetails = async (id: string) => {
    try {
      const { data } = await ApiService().client.get(`http://localhost:8080/api/groups/${id}/details`);
      setGroupDetails(data.group);
      setExpenses(data.expenses);
      setUsers(data.group.members);
      if (data.groupResult) {
        let result = data.groupResult;
        result = result.replace(/```html|```/g, '');
        result = result.replace(/\*\*/g, '');

        setSettleExpenseResult(result);
        setShowResultScreen(true);
      }
    } catch (error) {
      console.log("Error fetching group details", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSplitChange = (isEqual: boolean) => {
    setFormData({ ...formData, isEqualSplit: isEqual });
    setShowUnequalSplit(!isEqual);
  };

  const handleCustomAmountChange = (userId: number, amount: string) => {
    setFormData({
      ...formData,
      customAmounts: {
        ...formData.customAmounts,
        [userId]: amount,
      }
    });
  };

  const handleCreateExpense = async () => {
    try {
      await ApiService().client.post(`http://localhost:8080/api/expenses/create`, formData);
      fetchGroupDetails(id as string);
      setFormData(INITIAL_FORM_DATA_VALUE);
    } catch (error) {
      console.log("Error fetching group details", error);
    }
  };

  const settleUpExpenses = async () => {
    try {
      setLoadResult(true);
      setShowResultScreen(false);

      const response = await ApiService().client.get(`http://localhost:8080/api/expenses/${id}/settleExpenses`);

      let result = response.data.settlementSuggestion;

      result = result.replace(/```html|```/g, '');
      result = result.replace(/\*\*/g, '');

      setSettleExpenseResult(result);
      setLoadResult(false);
      setShowResultScreen(true);

    } catch (error) {
      console.log("Error fetching group details", error);
    }
  }

  return (
    <div className="group-details-container">
      <div className="group-details-header">
        <div className="group-details-header-top">
          <span className="back-button" onClick={() => navigate('/groups')}>
            <img src="https://static.thenounproject.com/png/251451-200.png" alt="Back" height={24} />
          </span>
          <span className="group-title">{groupDetails?.name}</span>
          <span className="group-details-categories">
            {groupDetails?.categories.map((category) => (
              <span
                key={category}
                className="group-category-tag"
                style={{ background: GROUP_CATEGORY_PROPERTIES[category].backgroundColor }}
              >
                {category}
              </span>
            ))}
          </span>
        </div>

        <div className="group-details-header-bottom">
          <span className="group-details-description">{groupDetails?.description}</span>
          <div className="group-details-members">
            <span className="group-details-member-heading">Group Members:</span>
            {groupDetails?.members.map((member) => (
              <span key={member._id} className="group-details-member-pill">{member.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* EXPENSES SECTION */}

      <div className="expenses-section">
        <div className="expenses-list">
          <span className="expense-list-header">
            <h3>Expenses</h3>
            {expenses.length > 0 && <span
              className="settle-expenses-button"
              onClick={settleUpExpenses}
            >
              Settle Expenses
            </span>}
          </span>
          {expenses.map((expense, expenseIndex) => (
            <div key={expenseIndex} className="expense-item">

              <div className="expense-tile-upper-section">
                <span className="expense-tile-name-section">
                  <span>{expense.name}</span>
                  <span className="expense-description">{expense.description}</span>
                </span>

                <span className="expense-amount">
                  <span> {expense.amount} ₹</span>
                </span>
              </div>

              <div className="expense-tile-lower-section">
                <span className="expense-paid-by">
                  <span>Paid By:</span> {expense.paidBy.name.split(' ')[0]}
                </span>

                <span className="expense-split-between">
                  <span>Split Between:</span> {expense.splitBetween.map(user => user.name.split(" ")[0]).join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!showResultScreen && !loadResult && (
          <div className="create-expense-form">
            <h3>Create Expense</h3>
            <input
              type="text"
              name="name"
              placeholder="Expense Name"
              value={formData.name}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Additional Note ( optional )"
              value={formData.description}
              onChange={handleFormChange}
            />
            <CustomDropdown
              placeholder="Split Between"
              options={users}
              multipleSelect={true}
              onSelection={(selectedOptions) => setFormData({ ...formData, splitBetween: selectedOptions as never[] })}
            />
            <div className="split-options">
              <span
                className={`split-option ${formData.isEqualSplit ? 'selected' : ''}`}
                onClick={() => handleSplitChange(true)}
              >
                Equal Split
              </span>
              <span
                className={`split-option ${!formData.isEqualSplit ? 'selected' : ''}`}
                onClick={() => handleSplitChange(false)}
              >
                Unequal Split
              </span>
            </div>

            {showUnequalSplit && (
              <div className="custom-amounts">
                {formData.splitBetween.map((user: ICustomDropdownOption, index) => (
                  <div key={index} className="custom-amount-item">
                    <span className="custom-input-user-name">{user.name}</span>
                    <input
                      type="text"
                      placeholder="Amount"
                      onChange={(e) => handleCustomAmountChange(user._id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            <button className="create-expense-button" onClick={handleCreateExpense}>Create Expense</button>
          </div>
        )}

        {
          loadResult && (
            <div className="loader-screen">
              <CircularProgress />
            </div>
          )
        }

        {
          showResultScreen && (
            <div className="result-screen">
              {<div dangerouslySetInnerHTML={{ __html: settleExpenseResult }}></div>}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default GroupExpenses;
