import React from "react";
import { Modal } from "antd";
import NewForm from "../customForm";

function NewFormModal({
  modalTitle,
  isModalOpen,
  handleCancel,
  onFinish,
  formSet,
  submitText,
}) {
  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered={true}
    >
      <NewForm
        name={modalTitle}
        onFinish={onFinish}
        formSet={formSet}
        submitText={submitText}
      />
    </Modal>
  );
}

export default NewFormModal;
