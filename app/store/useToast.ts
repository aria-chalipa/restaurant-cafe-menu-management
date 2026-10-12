import { defineStore } from 'pinia'


export const useToastStore = defineStore('useToastStore', () => {
  const toast = useToast()

  const showToast= (severity: string, summary: string, detail: string, life: number) => {
    toast.add({severity: severity, summary: summary, detail: detail, life: life})
  }

  return {showToast}
})
