import mitt from 'mitt';

export const bus = mitt();

let loading = 'start';

// listen to all events
bus.on('*', (type, e) => {
  console.log(type, e);
  if (type == 'loading') {
    loading = e;
  }
});

export function getLoading() {
  return loading;
}
