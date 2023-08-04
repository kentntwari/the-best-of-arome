import { useCallback } from "react";

const useModal = (refToModal) => {
  if (refToModal) {
    const openModal = useCallback(() => {
      refToModal.current.showModal();
      document.body.setAttribute("style", "overflow: hidden");
    }, []);

    const closeModal = useCallback(() => {
      refToModal.current.close();
      document.body.removeAttribute("style");
    }, []);

    return { openModal, closeModal };
  }

  if (refToModal === undefined)
    console.error("the reference to the modal is not defined");

  throw new Error(
    "no reference to modal found. Please provide a reference as an argument to the useModal hook"
  );
};

export { useModal };
