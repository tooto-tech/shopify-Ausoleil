/**
 * 动态监听 Tint VTO 弹窗并添加自定义类名
 * 用于覆盖 Svelte 随机类名的样式
 */
(function() {
  'use strict';

  const TARGET_CLASS = 'tint-vto-dialog-override';

  function addClassToDialog(dialog) {
    if (dialog && !dialog.classList.contains(TARGET_CLASS)) {
      dialog.classList.add(TARGET_CLASS);
    }
  }

  // 查找并处理现有的 dialog
  function processExistingDialogs() {
    document.querySelectorAll('dialog').forEach(addClassToDialog);
  }

  // 使用 MutationObserver 监听 DOM 变化
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 检查新增节点是否是 dialog
          if (node.tagName === 'DIALOG') {
            addClassToDialog(node);
          }
          // 检查新增节点内部是否包含 dialog
          node.querySelectorAll && node.querySelectorAll('dialog').forEach(addClassToDialog);
        }
      });
    });
  });

  // 启动监听
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // 处理页面加载时已存在的 dialog
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processExistingDialogs);
  } else {
    processExistingDialogs();
  }
})();
