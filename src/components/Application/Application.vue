<template>
  <slot></slot>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useMessage, useDialog, useLoadingBar } from 'naive-ui';
  import { bus, currentLoading } from '@/utils/eventbus';

  export default defineComponent({
    name: 'Application',
    setup() {
      const loadingBar = useLoadingBar();
      const message = useMessage();
      const dialog = useDialog();

      bus.on('loading', (status) => {
        if (status == 'start') {
          console.log('start');
          loadingBar.start();
        } else if (status == 'error') {
          loadingBar.error();
        } else {
          loadingBar.finish();
        }
      });

      bus.on('message.success', (msg) => {
        message.success(msg);
      });

      bus.on('message.error', (msg) => {
        message.error(msg);
      });

      bus.on('modal.info', (params) => {
        dialog.info(params);
      });

      bus.on('modal.warning', (params) => {
        dialog.warning(params);
      });
      bus.emit('loading', currentLoading());

      return {};
    },
  });
</script>
