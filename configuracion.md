## Configuración del archivo `config.js`

Sigue estos pasos para configurar correctamente tu bot:

1. **Número del propietario**

   Reemplaza el número existente por el número que deseas que sea el propietario del bot. Asegúrate de incluir también tu nombre. Aquí tienes un ejemplo de cómo hacerlo:

   ```bash
   global.owner = [
    ['Tu número', 'Tu nombre', true]
   ]
   ```

   Por ejemplo, si mi número es ‘5216673877887’ y mi nombre es ‘Zeppth’, entonces debo escribir:
   ```bash
   global.owner = [
   ['5216673877887', 'Zeppth', true]
   ]
   ```

   Recuerda poner el prefijo del país, pero no coloques ningún “+”.

2. **Puedes poner mas de un numero owner**

   Si deseas agregar más de un número de propietario, simplemente debes agregar el número en un array, como se muestra a continuación:
   ```bash
   global.owner = [
    ['Tu número', 'Tu nombre', true],
    ['numero que quieres que sea owner']
   //Ejemplo :
    ['52178787889998'],
    ['52199999999999'],
    ['5189888888888']
   ]
   ```
