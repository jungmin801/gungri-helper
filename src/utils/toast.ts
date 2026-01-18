import { reactive } from 'vue';

export type ToastType =
  | 'alert-success'
  | 'alert-error'
  | 'alert-warning'
  | 'alert-info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = reactive<Toast[]>([]);
let id = 0;

export function showToast(
  message: string,
  type: ToastType = 'alert-info'
) {
  const toastId = id++;
  toasts.push({ id: toastId, message, type });

  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === toastId);
    if (index !== -1) toasts.splice(index, 1);
  }, 2500);
}

export function useToasts() {
  return { toasts };
}
