## Configuración del archivo `config.js`

1. **5493584832032**

   Reemplaza el número existente por el número que deseas que sea el propietario del bot. Asegúrate de incluir también tu nombre. Aquí tienes un ejemplo de cómo hacerlo:

   ```
   global.owner = [
    ['5493584832032', 'Joaquin', true]
   ]
   ```

   Por ejemplo, si mi número es ‘5216673877887’ y mi nombre es ‘Zeppth’, entonces debo escribir:
   ```js
   global.owner = [
   ['5216673877887', 'Zeppth', true]
   ]
   ```
   Tambien puedes editar este parametro :
   ```js
   //moderadores :
   global.mods = ['5216673877887']

   // premiums :
   global.prems = ['5216673877887']
   ```

   Recuerda poner el prefijo del país, pero no coloques ningún “+”.

2. **Agregar más números de propietarios**

   Si deseas agregar más de un número de propietario, simplemente debes agregar el número en un array, como se muestra a continuación:
   ```js
   global.owner = [
    ['Tu número', 'Tu nombre', true],
   // Agrega más números de propietarios aquí
    ['52199999999999'],
    ['Número 2'],
    ['Número 3'],
   // ...
   ]
   ```
   
3. **Edita el prefijo del bot**

   El prefijo es el carácter o los caracteres que el bot busca al inicio de un mensaje para saber que es un comando. Si deseas cambiar el prefijo que el bot usa para responder a los comandos, puedes hacerlo editando la siguiente línea :

   ```js
   global.prefix = 'Tu prefijo aquí'
   //'/' '*' '!' '#' '.'

   global.prefix = '.'
    ```
   
4. **Edita la experiencia y las monedas del bot**

   Cuando se inicia el bot, se asigna una cantidad predeterminada de experiencia y monedas a cada usuario en su balance. Si deseas cambiar estos valores, puedes hacerlo editando las siguientes líneas :

   ```js
   global.rpg = {
    data: {
        exp: 0,
        coin: 1000,
        nivel: 0,
        role: 'Novato'
    }
   }
   ```

