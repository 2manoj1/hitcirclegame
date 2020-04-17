import React, { memo } from 'react';
import { Modal, Alert } from 'react-bootstrap';

const ScoreDialog = memo(({ score, confirmWindow, handleClose }) => {
    return (
        <Modal show={confirmWindow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Game Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="info">
                    {`Your final score is ${score}!`}
                </Alert>
            </Modal.Body>
        </Modal>
    );
});

export default ScoreDialog;