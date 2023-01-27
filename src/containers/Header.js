import React, { useState } from "react";
import QuestionAddModal from './QuestionAddModal';
import { useHistory } from "react-router-dom";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    return (
        <div className="ui fixed menu">
            <div className="grid center">
                <h2 onClick={() => history.push('/')}>Question Answer</h2>
                <button onClick={() => setShowModal(true)}>New Question</button>
            </div>
            <QuestionAddModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default Header
