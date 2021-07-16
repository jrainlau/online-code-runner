<template>
  <div class="console">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';

const defaultOptions = {
  theme: 'github',
  tabSize: 0,
  automaticLayout: true,
  wordWrap: 'wordWrapColumn',
  wordWrapColumn: 120,
  minimap: {
    enabled: false,
  },
  readOnly: true,
  lineHeight: 30,
};

let editor = null;
export default {
  data() {
    return {
      infos: '',
      linesCount: 0,
      deltaDecorations: [],
    };
  },
  mounted() {
    this.initConsole();
    this.bindEvents();
  },
  methods: {
    initConsole() {
      editor = monaco.editor.create(this.$refs.container, {
        ...defaultOptions,
      });
    },
    bindEvents() {
      window.addEventListener('message', (e) => {
        if (e.data.from === 'codeRunner') {
          const { data, type } = e.data;
          data.forEach((d) => {
            const info = { type };
            if (Array.isArray(d)) {
              info.data = JSON.stringify(d);
            } else if (d.constructor === Object) {
              info.data = JSON.stringify(d, null, 2);
            } else {
              info.data = String(d);
            }
            info.lines = typeof info.data === 'string' ? info.data.split(/\r\n|\r|\n/).length : 1;
            this.setValue(info);
          });
        }
      });
    },
    setValue(info) {
      this.infos += `${info.data}\n`;
      const startLine = this.linesCount + 1;
      const endLine = this.linesCount + info.lines;
      this.linesCount = endLine;
      editor.setValue(this.infos.replace(/\n$/, ''));
      this.deltaDecorations.push({
        range: new monaco.Range(startLine, 1, endLine, 1),
        options: { isWholeLine: true, className: `${info.type}Decoration` },
      });
      editor.deltaDecorations([], this.deltaDecorations);
      editor.revealLineInCenter(endLine);
    },
    clear() {
      console.clear();
      this.infos = '';
      this.linesCount = 0;
      this.deltaDecorations = []
      editor.setValue(this.infos);
      editor.deltaDecorations([], this.deltaDecorations);
      editor.revealLineInCenter(1);
    }
  },
};
</script>

<style lang="less" scoped>
.console {
  width: 100%;
  .container {
    height: 30vh;
  }
}
</style>
