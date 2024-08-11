import React, { useState, useEffect } from 'react';
import './Group.css';
import { IGroup } from '../../models/Group';
import ApiService from '../../services/ApiService';
import CustomDropdown, { ICustomDropdownOption } from '../CustomDropdown/CustomDropdown';

const Group: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [users, setUsers] = useState<ICustomDropdownOption[]>([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<ICustomDropdownOption[]>([]);
  const [currentGroupName, setCurrentGroupName] = useState('');
  const [currentGroupDescription, setCurrentGroupDescription] = useState('');

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
      const { data } = await ApiService().client.get('http://localhost:8080/api/groups/fetchUserGroups');
      setGroups(data.groups);
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
      memberIds: selectedUsers.map((user) => user._id)
    };

    try {
      const { data } = await ApiService().client.post('http://localhost:8080/api/groups/create', newGroupData);
      const updatedGroups = [data.group, ...groups];
      setGroups(updatedGroups);

      setIsCreatingGroup(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

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

      <div className={`group-content ${isCreatingGroup ? 'creating-group' : ''}`}>
        {isCreatingGroup && (
          <div className="create-group-form">
            <p className='create-new-group-heading'>Create a New Group</p>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="groupName"
                placeholder="Group Name"
                required
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
              <input
                type="text"
                name="groupDescription"
                placeholder="Group Description ( Optional )"
                onChange={(e) => setCurrentGroupDescription(e.target.value)}
              />

              <div className="members-section">
                <CustomDropdown
                  options={users}
                  multipleSelect={true}
                  placeholder="Select Members"
                  onSelection={handleUserSelect}
                  key="custom-users-selection-dropdown"
                />
              </div>

              <button className='create-group-submit-button' type="submit">Submit</button>
            </form>
          </div>
        )}

        <div className="group-list">
          <p className='group-list-heading'>Your Groups</p>
          <div className='group-list-container'>
            {groups.map((group, index) => (
              <div key={index} className="group-row">
                <div className='group-row-left'>
                  <span className='group-name'> {group.name} </span>
                  <span className='group-description'> {group.description} </span>
                </div>

                <div className='group-row-right'>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
