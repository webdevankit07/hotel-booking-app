import { useAppContext } from '../contexts/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogout } from '../api/apiClient';

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    //logout user..
    const mutation = useMutation({
        mutationFn: userLogout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
            showToast({ message: 'user logged out', type: 'SUCCESS' });
        },
        onError: (err: Error) => showToast({ message: err.message, type: 'ERROR' }),
    });
    const signOut = async () => mutation.mutate();

    return (
        <button className='px-3 font-bold text-blue-600 bg-white rounded-md hover:bg-gray-100' onClick={signOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
