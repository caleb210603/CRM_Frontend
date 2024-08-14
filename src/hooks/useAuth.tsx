import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getCookie } from '@/lib/utils';
import { User } from '@/types/auth';

export function useAuth() {
    const token = getCookie('accessToken');
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) && token;
    const user = useSelector((state: RootState) => state.auth.user) as User | null;

    return { isAuthenticated, user };
}