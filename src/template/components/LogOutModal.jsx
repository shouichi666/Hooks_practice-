import React from "react";
import Modal from "@material-ui/core/Modal";

const LogOutModal = ({ open, closeModal, logOut }) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      {
        <div className='LogOutModal'>
          <p className='LogOutModal__text'>ログアウトしますか？</p>

          <div className='LogOutModal__button'>
            <button onClick={closeModal} className='LogOutModal__button--disAgree'>
              NO
            </button>
            <button onClick={logOut} className='LogOutModal__button--agree'>
              YES
            </button>
          </div>
        </div>
      }
    </Modal>
  );
};

export default LogOutModal;
