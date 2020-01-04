# Ionic Angular App AD Esperntista

Aplicação para gerenciamento diário de Igrejas.

Siga os passos abaixo:
*Crie uma pasta 'environments' na pasta src.
*Dentro da pasta 'environments', crie um arquivo chamado 'environment.ts' ou 'environment.prod.ts'.Com a estrutura abaixo:

~~~javascript
export const environment = {
  production: true,
  guid: require('guid'),
  //BASE_URL: '/api',
   firebaseConfig: {
    //Sua configurações do firebase storage aqui
    //Para ter essas configurações, você precisa criar um projeto no firebase, e mais específicamente criar um storage.
  }
}
~~~
**(Neste app utilizo o arquivo com nome 'environment.prod.ts', mas você pode utilizar a primeira opção, contanto
que você altere o nome nos locais onde este é utilizado).**
*Este app utiliza uma api node
