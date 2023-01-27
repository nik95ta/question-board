import React, { useEffect } from "react";
import ReactDom from 'react-dom';
import './style/Modal.css';

const Modal = (props) => {
    if (!props.show) {
        return null;
    }
    return ReactDom.createPortal(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Add New Question</h4>
                </div>
                <div className="modal-body">Modal Body</div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">
                        Close
                    </button>
                </div>
            </div>
        </div>, document.getElementById("root")
    );
};

export default Modal
