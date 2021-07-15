<template>
  <div class="app">
    <Monaco ref="monaco" />
    <div>
      <button @click="runCode">Run code</button>
    </div>
    <Console />
  </div>
  <iframe
    style="display: none;"
    ref="iframe"
    src="/preview.html"
    sandbox="allow-same-origin allow-scripts">
  </iframe>
</template>

<script>
/* eslint-disable no-useless-escape */

import Monaco from './components/Monaco.vue';
import Console from './components/Console.vue';

export default {
  name: 'App',
  components: {
    Monaco,
    Console,
  },
  data() {
    return {
      diffOptions: {
        original: '// 哈哈哈\n呵呵呵\n嘻嘻嘻',
        modified: '// 哈哈哈\n呵嘿呵\n嘻嘻嘻',
      },
    };
  },
  methods: {
    runCode() {
      const code = this.$refs.monaco.submit();
      const { iframe } = this.$refs;
      const iframeDoc = iframe.contentDocument;
      iframeDoc.open();
      iframeDoc.write(`
  <body>
    <script>
try {
  ${code.replace('parent.document', 'window.disableParent')}
} catch(e) {
  console.error(e.name, e.message)
}
    <\/script>
  </body>
      `);
      iframeDoc.close();
    },
  },
};
</script>

<style lang="less">
.app {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>
