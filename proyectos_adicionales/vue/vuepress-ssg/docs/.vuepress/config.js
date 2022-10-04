module.exports = {
  themeConfig: {
    sidebar: 'auto'
  },
  markdown: {
    lineNumbers: true
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'pt-BR', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Gerador de Site Estáticos'
    },
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    }
  }
}