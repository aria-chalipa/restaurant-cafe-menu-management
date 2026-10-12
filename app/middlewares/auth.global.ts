import { useAuthUser } from "~/store/useAuthUser";

export default defineNuxtRouteMiddleware((to, from) => {
    const route = useRoute();
    const user = useAuthUser();
    if (to.path.toLocaleLowerCase().startsWith('/auth') == false && !user.isLoggedIn) {
        if(user.loginRedirect) {
            return navigateTo('/auth');
        }   
    } else {
        if(user.loginRedirect) {
            return navigateTo(`/menu/${route.params.id}`);
        }
    }
})
