import mitt from 'mitt';
import { ref } from 'vue';

export const bus = mitt();

const loading = ref('finish'); // 记录UI界面出现前的弹窗状态。
let boot = true; // 当前是否出于页面初始阶段

// 事先监听所有事件，以便记录初始状态
bus.on('*', (type, e) => {
  // console.log(type, e);
  // 经过尝试，目前只发现loading状态需要记录。
  if (boot && type == 'loading') {
    loading.value = e;
  }
  // 目前网络消息简单被抛弃，如果有的话。
  // 记录和重现弹窗反而会造成弹窗重复出现，因此不做处理
});

export function currentLoading() {
  boot = false;
  return loading.value;
}
