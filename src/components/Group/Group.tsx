import React, { useState, useEffect } from 'react';
import './Group.css';
import { IGroup } from '../../models/Group';
import ApiService from '../../services/ApiService';
import CustomDropdown, { ICustomDropdownOption } from '../CustomDropdown/CustomDropdown';
import { GROUP_CATEGORIES, GROUP_CATEGORY_PROPERTIES } from '../../constants/GroupCategories';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Group: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [users, setUsers] = useState<ICustomDropdownOption[]>([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<ICustomDropdownOption[]>([]);
  const [currentGroupName, setCurrentGroupName] = useState('');
  const [currentGroupDescription, setCurrentGroupDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  useEffect(() => {
    fetchGroups().then((r) => {
      return r;
    });
  }, []);

  useEffect(() => {
    if (isCreatingGroup) {
      const fetchUsers = async () => {
        try {
          const { data } = await ApiService().client.get('http://localhost:8080/api/users/allUsers');
          setUsers(data.users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [isCreatingGroup]);

  const fetchGroups = async () => {
    try {
      setLoadingGroups(true);
      const { data } = await ApiService().client.get('http://localhost:8080/api/groups/fetchUserGroups');
      setGroups(data.groups);
      setTimeout(() => {
        setLoadingGroups(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroupClick = () => {
    setIsCreatingGroup(true);
  };

  const handleCancelClick = () => {
    setIsCreatingGroup(false);
    setSelectedUsers([]);
  };

  const handleUserSelect = (selectedUsers: ICustomDropdownOption[]) => {
    setSelectedUsers(selectedUsers);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newGroupData = {
      groupName: currentGroupName,
      groupDescription: currentGroupDescription,
      categories: selectedCategories,
      memberIds: selectedUsers.map((user) => user._id)
    };

    try {
      const { data } = await ApiService().client.post('http://localhost:8080/api/groups/create', newGroupData);
      const updatedGroups = [data.group, ...groups];
      setGroups(updatedGroups);

      setIsCreatingGroup(false);
      setSelectedUsers([]);
      setSelectedCategories([]);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleCategorySelection = (category: string) => {
    if (selectedCategories.includes(category)) {
      const updatedSelectedCategories = selectedCategories.filter((c) => c != category);
      setSelectedCategories(updatedSelectedCategories);
    } else {
      const updatedSelectedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedSelectedCategories);
    }
  }

  return (
    <div className="group-container">
      <header className="group-header">
        <div className="group-buttons">
          <button className="cancel-btn" onClick={handleCancelClick} disabled={!isCreatingGroup}>
            Cancel
          </button>
          <h1>Manage Groups</h1>
          <button className="create-btn" onClick={handleCreateGroupClick}>
            Create a Group
          </button>
        </div>
      </header>

      <div className="group-content">
        {isCreatingGroup && (
          <div className={`create-group-form ${isCreatingGroup ? 'show-create-group' : 'hide-create-group'}`}>
            <p className='create-new-group-heading'>Create a New Group</p>
            <form className='group-form-container' onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="groupName"
                placeholder="Group Name"
                required
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
              <textarea
                name="groupDescription"
                placeholder="Group Description"
                onChange={(e) => setCurrentGroupDescription(e.target.value)}
              />

              <div className='group-categories'>
                {
                  GROUP_CATEGORIES.map((category, categoryIndex) => {
                    return (
                      <div
                        className={`category-pill ${selectedCategories.includes(category) ? 'group-category-selected' : ''}`}
                        onClick={() => handleCategorySelection(category)}
                        key={categoryIndex}
                      > {category} </div>
                    )
                  })
                }
              </div>

              <div className="members-section">
                <CustomDropdown
                  options={users}
                  multipleSelect={true}
                  placeholder="Select Members"
                  onSelection={handleUserSelect}
                  key="custom-users-selection-dropdown"
                />

                <div className='selected-members-section'>
                  {
                    selectedUsers.length > 0 && selectedUsers.map((user, selectedUserIndex) => {
                      return (
                        <div
                          key={selectedUserIndex}
                          className="selected-member-pill"
                        >
                          {user.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <button className='create-group-submit-button' type="submit">Submit</button>
            </form>
          </div>
        )}

        <div className="group-list">
          <p className='group-list-heading'>Your Groups</p>
          {!loadingGroups &&
            (<div className='group-list-container'>
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="group-row"
                  onClick={() => navigate(`/group/${group._id}/expenses`)}
                >
                  <div className='group-row-left'>
                    <span className='group-name'> {group.name} </span>
                    <span className='group-description'> {group.description} </span>
                  </div>

                  <div className='group-row-right'>
                    {
                      group.categories.map((category, groupCategoryIndex) => {
                        return (
                          <div
                            key={groupCategoryIndex}
                            className="group-category-tag"
                            style={{ background: GROUP_CATEGORY_PROPERTIES[category].backgroundColor }}
                          >
                            {category}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ))}
            </div>
            )
          }

          {
            loadingGroups && (
              <div className="group-loader">
                <span style={{ color: 'grey', fontSize: '13px' }}> Loading your Groups.... </span>
                <CircularProgress />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Group;
