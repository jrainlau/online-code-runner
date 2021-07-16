<template>
  <div class="app">
    <h2>Online code runner</h2>
    <div class="monaco">
      <Monaco ref="monaco" />
    </div>
    <div class="buttons">
      <button @click="runCode">Click to run code</button>
      <button class="clear" @click="clearConsole">Clear</button>
    </div>
    <div class="console">
      <Console ref="console" />
    </div>
  </div>
  <iframe
    style="display: none;"
    ref="iframe"
    :src="pathname"
    sandbox="allow-same-origin allow-scripts">
  </iframe>
</template>

<script>
/* eslint-disable no-useless-escape */
import Monaco from './components/Monaco.vue';
import Console from './components/Console.vue';
import codeTpl from './utils/codeTemplate';

export default {
  name: 'App',
  components: {
    Monaco,
    Console,
  },
  data() {
    return {
      pathname: `${location.pathname}preview.html`,
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
      iframeDoc.write(codeTpl(code));
      iframeDoc.close();
    },
    clearConsole() {
      this.$refs.console.clear();
    }
  },
};
</script>

<style lang="less">
.app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  h2 {
    margin: 15px 0;
    font-family: fantasy;
  }
  .monaco,
  .console {
    width: 100%;
    border: 1px solid #000;
    box-sizing: border-box;
    border-radius: 4px;
    overflow: hidden;
  }
  .buttons {
    width: 100%;
    display: flex;
    button {
      margin: 5px 0;
      border: none;
      width: 100%;
      border: 2px solid rgb(248, 135, 154);
      background: rgb(252, 171, 185);
      height: 5vh;
      color: #fff;
      border-radius: 4px;
      &.clear {
        width: 30%;
        border: 2px solid rgb(172, 171, 171);
        background: rgb(190, 189, 189);
        margin-left: 5px;
      }
    }
  }
}
</style>
