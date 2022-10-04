# Documentação VuePress

Essa é a estrutura de uma documentação desenvolvida com VuePress.

## Tabela de Conteúdo

[[toc]]


## Emoji

:tada: :100:

## Componentes

<PButton />


## Containers personalizados

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

## Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Bloco de Código

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

## Destaque de linha em blocos de código

``` js{4}
export default {
  data () {
    return {
      msg: 'Destaque aqui!'
    }
  }
}
```

## Usando Vue no MarkDown

### Interpolação
{{ 1 + 1 }}

### Diretivas

<div v-for="i in 3">{{ i }} </div>

### Acesso aos dados da página

{{ $page }}


### Escape

::: v-pre
`{{ This will be displayed as-is }}`
:::
