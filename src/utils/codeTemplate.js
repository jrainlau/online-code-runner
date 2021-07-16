export default (code) => {
  const theCode = code.replace('parent.document', 'window.disableParent');
  const template = `
<body>
  <script>
    try {
      ${theCode}
    } catch(e) {
    console.error(e.name, e.message)
    }
  </script>
</body>
`;
  return template;
}
