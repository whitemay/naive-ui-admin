import { defineComponent } from 'vue';
import { useMessage, useDialog, useLoadingBar } from 'naive-ui';
import { loadingSubject, messageSubject, modalSubject } from '@/utils/subjects';

export const AppProvider = defineComponent({
  name: 'Application',
  setup() {
    const loadingBar = useLoadingBar();
    const message = useMessage();
    const dialog = useDialog();

    loadingSubject.subscribe({
      next: (status) => {
        if (status == 'start') {
          loadingBar.start();
        } else if (status == 'error') {
          loadingBar.error();
        } else {
          loadingBar.finish();
        }
      },
    });

    messageSubject.subscribe((event: any) => {
      switch (event.type) {
        case 'error': {
          message.error(event.info);
          break;
        }
        case 'warning': {
          message.warning(event.info);
          break;
        }
        case 'info': {
          message.info(event.info);
          break;
        }
        case 'success': {
          message.success(event.info);
        }
      }
    });

    modalSubject.subscribe((event: any) => {
      switch (event.type) {
        case 'info': {
          dialog.info(event.params);
          break;
        }
        case 'warning': {
          dialog.warning(event.params);
          break;
        }
      }
    });

    return {};
  },
  render() {
    function noop() {} // 单纯为了避免TS报错
    return [(this.$slots.default || noop)()];
  },
});
