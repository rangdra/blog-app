import { ReactNode, useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface IProps {
  title: string;
  visible: any;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ title, visible, onClose, children }: IProps) {
  const modalRef = useRef<any>(null);
  const refBody = useRef<any>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleESC = (event: any) => {
    event.preventDefault();
    handleClose();
  };

  useOnClickOutside(refBody, handleClose);

  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={handleESC}
    >
      <div className="modal-box" ref={refBody}>
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
      </div>
    </dialog>
  );
}

export default Modal;
