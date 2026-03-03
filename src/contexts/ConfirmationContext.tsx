import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Modal } from '../components/ui/Modal';

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

type ConfirmationFn = (options: ConfirmationOptions) => Promise<boolean>;

const ConfirmationContext = createContext<ConfirmationFn | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      'useConfirmation must be used within a ConfirmationProvider',
    );
  }
  return context;
};

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);
  const [resolver, setResolver] = useState<
    ((confirmed: boolean) => void) | null
  >(null);

  const confirm = useCallback((opts: ConfirmationOptions) => {
    return new Promise<boolean>((resolve) => {
      setOptions(opts);
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = () => {
    setOptions(null);
    if (resolver) {
      resolver(false);
      setResolver(null);
    }
  };

  const handleConfirm = () => {
    setOptions(null);
    if (resolver) {
      resolver(true);
      setResolver(null);
    }
  };

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      {options && (
        <Modal
          isOpen={!!options}
          onClose={handleClose}
          title={options.title}
          footer={
            <>
              <button
                onClick={handleClose}
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
              >
                {options.cancelText || 'Cancel'}
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                {options.confirmText || 'Confirm'}
              </button>
            </>
          }
        >
          <p className="text-gray-400">{options.message}</p>
        </Modal>
      )}
    </ConfirmationContext.Provider>
  );
};
