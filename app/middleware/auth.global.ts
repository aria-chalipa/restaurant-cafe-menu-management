import { useAuthUser } from "~/store/useAuthUser";

export default defineNuxtRouteMiddleware((to) => {
    const authUser = useAuthUser();
    const isAuthPage = to.path.toLowerCase().startsWith('/auth');

    if (!isAuthPage) {
        if (!authUser.isLoggedIn) {
            return navigateTo('/auth');
        }
    }else {
        if (authUser.isLoggedIn) {
            return navigateTo(`/menu-${authUser.getUser().id}`);
        }
    }

})
