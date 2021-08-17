import mitt from 'mitt';
import { ref } from 'vue';

export const bus = mitt();

const loading = ref('start');

// listen to all events
bus.on('*', (type, e) => {
  // console.log(type, e);
  if (type == 'loading') {
    loading.value = e;
  }
});

export function currentLoading() {
  return loading.value;
}
