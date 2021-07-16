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
  lineHeight: 28,
  fontSize: 16,
  minimap: {
    size: 'fill',
  },
};

let editor = null;

export default {
  props: {
    initContent: {
      type: String,
      default: `// Input javascript code here
for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) {
    console.warn(i)
  } else {
    console.log(i)
  }
}
console.error('Works fine, no error!')
`,
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
  width: 100%;
  .container {
    height: 40vh;
  }
}
</style>
