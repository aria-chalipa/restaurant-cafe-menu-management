<template>
    <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold text-stone-800 mb-8 text-center">دسته‌بندی منو</h2>

        <div v-if="isLoading" class="flex justify-center py-16">
            <ProgressSpinner style="width: 50px; height: 50px" />
        </div>

        <div v-else-if="hasError" class="text-center text-red-500 py-16">
            خطا در دریافت منو. دوباره تلاش کنید.
        </div>

        <div v-else class="categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <NuxtLink
                v-for="category in menuCategories"
                :key="category"
                :to="`/menu-${authUser.id}/category-${category}`"
                class="category-item"
            >
                <div class="h-full flex flex-col items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-6 shadow-md shadow-orange-200/50 transition-all duration-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5">
                    <div class="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50">
                        <Tag class="text-orange-500 w-5 h-5" />
                    </div>
                    <span class="font-medium text-stone-800 capitalize">{{ category }}</span>
                </div>
            </NuxtLink>
        </div>
        <ResultCom
          :totalPrice="totalPrice"
          :cartItems="cartItems"
          :isSubmitting="isSubmitting"
          :submitOrder="submitOrder"
        />
    </div>

</template>

<script lang="ts" setup>
import ResultCom from '~/components/resultCom.vue';
import { getMenuItem } from '~/sevices/menuItem.sevices';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from '@primeicons/vue/tag';
import { useAuthUser } from '~/store/useAuthUser';
import { useToastStore } from '~/store/useToast';
import { useUserOrders } from '~/store/useUserOrders';
import { PostOrders } from '~/sevices/orders.services';
import { OrderStatus, type UserOrder } from '~/models/users/Orders';

const menuCategories = ref<string[]>([]);
const isLoading = ref(true);
const hasError = ref(false);
const authUser = useAuthUser();
const { showToast } = useToastStore();
const user = useAuthUser();
const orders = useUserOrders();
const route = useRoute();
const router = useRouter();

//@ts-ignore
const cartItems = computed(() => orders.getUserOrders().flatMap(order => order.items));
const totalPrice = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
const isSubmitting = ref(false);

const submitOrder = async () => {
  isSubmitting.value = true;
  const  res = await PostOrders({
    id: Number(user.getUser()?.id) || 0,
    name: user.getUser()?.name || '',
    items: [
        ...cartItems.value,
    ],
    totalPrice: totalPrice.value,
    status : OrderStatus.Pending,
    createdAt: new Date()

  });
  router.push('/order');  
  isSubmitting.value = false;
  showToast('success', 'سفارش با موفقیت ثبت شد', '', 2000);
  orders.clearUserOrders();

};

const getMenuCategory = async () => {
    isLoading.value = true;
    hasError.value = false;
    try {
        const response = await getMenuItem();
        menuCategories.value = Array.from(new Set(response.map(item => item.category)));
    } catch (error) {
        hasError.value = true;
    } finally {
        isLoading.value = false;
        if (route.query.welcome === '1' && user.getUser()) {
            showToast('success', `سلام ${user.getUser().name}`, 'به رستوران ما خوش آمدید', 2000);
            router.replace({ query: {} });
        }
    }
};

onMounted(() => {
    getMenuCategory();
});


definePageMeta({
  title: 'Home',
  layout: 'index-page'
})
</script>