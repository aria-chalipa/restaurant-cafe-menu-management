import type { User } from '~/models/users/Users';
import type { FetchConfig } from '~/models/FetchConfig';

export function fetchUsers <T = User[], B = User> (url: string, config : FetchConfig<B> | undefined): Promise<T> {
    let newConfig : FetchConfig<B> = {
        baseURL: '/api/users',
        ...config,
        retry: 1
    };
        
    return $fetch<T>(url, newConfig)
}
