import type { MenuItems } from '~/models/menu/MenuItems';
import type { FetchConfig } from '~/models/FetchConfig';

export function fetchMenuItems <T = MenuItems[]> (url: string, config : FetchConfig<null> | undefined): Promise<T> {
    let newConfig : FetchConfig<null> = {
        baseURL: '/api/menu',
        ...config,
        retry: 1
    };
        
return $fetch<T>(url, newConfig)
}