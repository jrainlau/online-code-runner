function rewriteConsole(type) {
  const origin = console[type];
  console[type] = (...args) => {
    window.parent.postMessage({ from: 'codeRunner', type, data: args }, '*');
    origin.apply(console, args);
  };
}

rewriteConsole('log');
rewriteConsole('info');
rewriteConsole('debug');
rewriteConsole('warn');
rewriteConsole('error');
rewriteConsole('table');
rewriteConsole('time');
rewriteConsole('timeEnd');

Object.defineProperty(window, 'disableParent', {
  get() {
    throw new Error('无法调用 window.parent 属性！');
  },
  set() {},
});
