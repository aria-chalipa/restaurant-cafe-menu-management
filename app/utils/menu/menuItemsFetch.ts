import type { MenuItems } from '~/models/menu/menuItems';
import type { FetchConfig } from '~/models/FetchConfig';

export function fetchMenuItems <T = MenuItems[]> (url: string, config : FetchConfig | undefined): Promise<T> {
    let newConfig : FetchConfig = {
        baseURL: 'http://localhost:3001',
        ...config,
        retry: 1
    };
        
return $fetch<T>(url, newConfig)
}