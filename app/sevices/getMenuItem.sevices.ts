import type { MenuItems } from '~/models/menu/menuItems';
import type { FetchConfig } from '~/models/FetchConfig';
import { fetchMenuItems } from '~/utils/menu/menuItemsFetch';

export function getMenuItem() {
    return fetchMenuItems<MenuItems[]>('/items', {
        method: 'GET',
    });
}
