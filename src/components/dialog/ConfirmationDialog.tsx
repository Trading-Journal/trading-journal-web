import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useRef, useState } from 'react';

type UseModalShowReturnType = {
  show: boolean;
  setShow: (value: boolean) => void;
  onHide: () => void;
};

const useModalShow = (): UseModalShowReturnType => {
  const [show, setShow] = useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    onHide: handleOnHide,
  };
};

type ModalContextType = {
  showConfirmation: (
    title: string,
    message: string | JSX.Element
  ) => Promise<boolean>;
};

type ConfirmationModalContextProviderProps = {
  children: React.ReactNode;
};

const ConfirmationModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

const ConfirmationModalContextProvider: React.FC<
  ConfirmationModalContextProviderProps
> = (props) => {
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState<{
    title: string;
    message: string | JSX.Element;
  } | null>();
  const resolver = useRef<Function>();

  const handleShow = (
    title: string,
    message: string | JSX.Element
  ): Promise<boolean> => {
    setContent({
      title,
      message,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext: ModalContextType = {
    showConfirmation: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}
      {content && (
        <Dialog open={show}>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              variant="outlined"
              startIcon={<ClearIcon />}
            >
              Disagree
            </Button>
            <Button
              onClick={handleOk}
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ConfirmationModalContext.Provider>
  );
};

const useConfirmationModalContext = (): ModalContextType =>
  useContext(ConfirmationModalContext);

export { useModalShow, useConfirmationModalContext };

export default ConfirmationModalContextProvider;
