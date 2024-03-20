import { useEffect } from 'react';

type ToastProps = {
    message: string | undefined;
    type: 'SUCCESS' | 'ERROR';
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div
            className={`fixed top-4 z-[99999] right-4 p-4 rounded-md text-white max-w-md ${
                type === 'SUCCESS' ? 'bg-green-500' : 'bg-red-600'
            }`}
        >
            <div className='flex items-center justify-center'>
                <span className='text-lg font-semibold'>{message}</span>
            </div>
        </div>
    );
};

export default Toast;
