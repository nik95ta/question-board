import React, { useState } from "react";
import Modal from './Modal';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="ui fixed menu">
            <div className="grid center">
                <h2>Question Answer</h2>
                <button onClick={() => setShowModal(true)}>New Question</button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default Header
