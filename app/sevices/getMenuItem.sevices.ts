import type { MenuItems } from '~/models/menu/MenuItems';
import type { FetchConfig } from '~/models/FetchConfig';
import { fetchMenuItems } from '~/utils/menu/menuItemsFetch';

export function getMenuItem() {
    return fetchMenuItems<MenuItems[]>('/items', {
        method: 'GET',
    });
}
