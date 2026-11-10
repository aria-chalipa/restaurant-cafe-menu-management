import type { MenuItems } from '~/models/menu/MenuItems';
import { fetchMenuItems } from '~/utils/menu/menuItemsFetch';

export function getMenuItem() {
    return fetchMenuItems<MenuItems[]>('/items', {
        method: 'GET',
    });
}
