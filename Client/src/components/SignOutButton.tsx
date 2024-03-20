import { useAppContext } from '../contexts/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogout } from '../api/apiClient';
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';

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
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Sign Out</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='text-white bg-slate-950'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-gray-400'>
                        This action cannot be undone. This will logged out your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-black'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={signOut} className='text-white bg-red-600'>
                        Sign Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SignOutButton;
