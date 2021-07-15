<template>
  <div class="monaco">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';

const defaultOptions = {
  language: 'javascript',
  tabSize: 2,
  autoIndent: true,
  theme: 'github',
  automaticLayout: true,
  wordWrap: 'wordWrapColumn',
  wordWrapColumn: 120,
  minimap: {
    size: 'fill',
  },
};

let editor = null;

export default {
  props: {
    initContent: {
      type: String,
      default: '// 在这里填入 js 脚本代码\n',
    },
    diffEditor: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['submit'],
  mounted() {
    if (this.diffEditor) {
      this.initDiffEditor();
    } else {
      this.initEditor();
    }
  },
  methods: {
    initEditor() {
      editor = monaco.editor.create(this.$refs.container, {
        ...defaultOptions,
        ...this.options,
        value: this.initContent,
      });
      editor.getModel().updateOptions({ tabSize: 8 });
    },
    initDiffEditor() {
      editor = monaco.editor.createDiffEditor(this.$refs.container, {
        ...defaultOptions,
        ...this.options,
        readOnly: true,
      });
      editor.setModel({
        original: monaco.editor.createModel(this.diffEditor.original),
        modified: monaco.editor.createModel(this.diffEditor.modified),
      });
    },
    submit() {
      const value = editor.getValue();
      return value;
    },
  },
};
</script>

<style lang="less" scoped>
.monaco {
  border: 2px solid #ccc;
  width: 500px;
  .container {
    height: 400px;
  }
}
</style>
