// CompletedActions.js
import React, { useState } from 'react';
import './CompletedActions.css';

const CompletedActions = () => {
    const [actions, setActions] = useState([]);

    // Function to add a new action card
    const handleAddAction = () => {
        const newAction = { id: actions.length + 1, text: 'Action Completed' };
        setActions([...actions, newAction]);
    };

    // Function to remove an action card
    const handleRemoveAction = (id) => {
        setActions(actions.filter(action => action.id !== id));
    };

    return (
        <div className="completed-actions-container">
            <button className="add-button" onClick={handleAddAction}>Add Completed Action</button>
            <div className="actions-list">
                {actions.map(action => (
                    <div key={action.id} className="action-card">
                        <p>{action.text}</p>
                        <button className="remove-button" onClick={() => handleRemoveAction(action.id)}>✖</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompletedActions;