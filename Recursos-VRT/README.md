Sección dedicada a la explicación del empleo del código fuente para pruebas que soportan Visual Regression Testing (VRT)

# Escenarios de prueba base del código

* PA001. Edición de página: Se accede a la sección de creación de nueva página y se crea una nueva página. Luego desde sección de páginas se accede a página creada y se edita su titulo y contenido, y se verifica su contenido actualizado en sitio de contenido.
* PA002. Publicación programada de página: Desde sección de posts del sitio admin, se crea un nuevo post y se programa su publicación para una fecha futura (preferiblemente el mismo día) y luego pasado el tiempo necesario se verifica su publicación en sitio de contenido.
* PA003. Borrar página existente: Teniendo una página (vinculada o no en navbar) creada en el sitio, se verifica que se pueda borrar y que no quede listada en la sección de Páginas después del borrado
* PA004. Creación de página con título que trae carácteres no permitidos: Se accede a la sección de creación de nueva página, y se trata de crear una nueva página que incluya en su título carácteres no permitidos (por ejemplo ñ!@#¢∞¬÷), luego se verifica que ocurre error al tratar de publicarla.
* PA005. Enlazar nueva página en componente navbar: Al crearse una nuevá pagina vinculada al sitio, se vincula en navbar del sitio y se logra navegar a la misma desde dicho navbar
* PA006. Renombrar página y componentes navbar asociados: Teniendo una página enlazada al navbar del sitio, se cambia el nombre de la página y su URL asociado, y se edita el nombre del componente navbar más su enlace interno y se verifica que se puede acceder aun a la página editada desde el navbar.
* PA007. Renombrar página vinculada en navbar: Teniendo una página enlazada al navbar del sitio, se cambia el nombre de la página y su URL (pero no se modifica item navbar) y se verifica que al hacer clic en el enlace ya existente desde navbar no se pueda acceder a la pagina editada.
* PA008. Creación de tag y asignación a post: Teniendo un post ya creado en el sitio, se accede a sección de tags y se genera un nuevo tag, luego se aplica el tag creado al post deseado.
* PA009. Creación y eliminación de tag: Se accede a sección de tags y se genera un nuevo tag, se observa que el tag nuevo aparece en la sección de tags, luego se procede a borrarlo y se verifica que no aparezca en la sección de tags.
* PA010. Creación y edición de tag: Se accede a sección de tags y se genera un nuevo tag, se observa que el tag nuevo aparece en la sección de tags, luego se procede a editar sus detalles y se verifica que el tag incluya todos los cambios de propiedad.
* PA011. Borrar post existente en el sitio: Teniendo un post ya publicado en el sitio, se procede a borrar el mismo desde herramienta de administración, y se verifica su eliminación en la sección de gestión de posts
* PA012. Publicar post en draft: Habiendo generado un borrador o draft de un post para publicar en el sitio, se ingresa nuevamente a la página de edición del mismo, se edita y se publica, y luego se verifica su publicación en el sitio.
* PA013. Eliminar post en draft: Habiendo generado un borrador o draft de un post para publicar en el sitio, se ingresa nuevamente a la página de edición del mismo, se procede a eliminarlo, y luego se verifica que ya no aparezca en la sección de drafts.
* PA014. Asignar a post creado un tag deseado: Habiendo creado un nuevo post, se procede a editar el post y se aplica un tag deseado al mismo, luego se va al sitio de contenido y se verifica que el post tenga el tag aplicado.
* PA015. Verificar cambio de contraseña exitoso: Habiendo ingresado a la seccion de Your Profile de la cuenta logueada, se cambia la contraseña asociada a la cuenta a una nueva, y se verifica que el login fracase con la credencial vieja y que el login opere con la nueva clave.
* PA016. Verificar cambio de e-mail exitoso: Habiendo ingresado a la seccion de Your Profile de la cuenta logueada, se cambia el e-mail asociado a la cuenta por uno diferente, y se verifica que el login fracase al ingresar con el e-mail antiguo y que el login opere al usar el e-mail nuevo.
* PA017. Invitar un nuevo usuario del sitio: Habiendo ingresado a la sección de Staff, se invita a un nuevo usuario dando un correo para enviar invitación con el rol deseado, y se verifica que en la sección de invitados aparezca listado el correo de invitación.
* PA018. Revocar invitación a un nuevo usuario del sitio: Habiendo realizado una invitación para un nuevo usuario del sitio a través de e-mail, se ingresa a la sección de Staff, y se ubica el correo de invitación en el listado de invitaciones, y se realiza revocación de la invitación, luego se verifica que aparece un mensaje de revocación exitosa.
* PA019. Suspender a un usuario activo: Habiendo ingresado a la sección de Staff en el sitio de administración, se selecciona un usuario activo y se aplica suspensión del mismo desde la página de administración del susodicho
* PA020. Remover la suspensión puesta sobre un usuario: Habiendo ingresado a la sección de Staff en el sitio de administración, se selecciona un usuario suspendido y se remueve la suspensión sobre el mismo desde la página de administración del susodicho.

# Instrucciones de ejecución de código de escenarios de pruebas

## Precondiciones generales

1. Instalar node versiones 14 (recomendado v14.15.0)  segun su sistema operativo. Se recomienda NVM tanto para Windows como para sistemas Linux. Instrucciones disponibles tanto para Linux: (https://github.com/nvm-sh/nvm) o su spin'off en Windows (https://github.com/coreybutler/nvm-windows)
2. Tener instalada una instancia de Ghost v3.41.1. y una de Ghost v4.44.0 Más información en https://ghost.org/docs/install/local/
3. Activar la instancia de Ghost requerida con el comando `ghost start` si no lo ha hecho para la instancia con pruebas deseadas
4. Descargar los contenidos del repositorio en su carpeta de preferencia, sea por descarga de ZIP o por "git clone https://github.com/clts-uniandes/PruebasAutomatizadas.git"

### Instalar Ghost:
- Ejecutar el comando `ghost install 4.4 --local --force` en el directorio que desee hacer la instalacion de la version 4.4
- Ejecutar el comando `ghost install 3.41.1 --local --force` en el directorio que desee hacer la instalacion de la version 3.41.1

### Desplegar Ghost con Docker
- docker run -d -e url=http://localhost:3002 -p 3001:2368 --name ghost_x.yy.z ghost:x.yy.z donde x.yy.z se reemplaza con la imagen requerida (3.41.1 y 4.44.0)
ej. `docker run -d -e url=http://localhost:3002 -p 3001:2368 --name ghost_3.41.1 ghost:3.41.1`

## Kraken
   
### Prerequisitos:
- NodeJS 12 o posterior
- Ghost V3.41.1
- Ghost V4.4

### Ejecución de pruebas:
1. Ingresar al directorio kraken `cd kraken`
2. Instalar dependencias `npm install`
3. Configurar el archivo `kraken/properties.js` con los parametros 
```json
{
    "USERNAME": "usuario@login.ghost", //usuario login del sitio
    "PASSWORD": "*******", //Contraseña login del sitio
    "LOGIN_URL": "http://localhost:2369/ghost/#/signin", //URL del sitio a probar
    "BASE_URl": "http://localhost:2369/ghost/#/signin", //URL del sitio a probar
    "PATH_SCREENSHOTS": "./screenshots/ghost3" //debe cambiar el directorio al cambiar version de Ghost
}
```
4. En el directorio `kraken` __encontrará dos carpetas__ `features_ghost3` y `features_ghost4`, dependiendo la version que desee probar __debe renombrar la carpeta a `features`__
5. Ejecutar el comando `./node_modules/kraken-node/bin/kraken-node run`
6. Los screenshots quedaran almacenados en `screenshots/{nombre_configurado/{id_screenshot}.png`
### Ejecución de pruebas de regresión visual:
#### Prerequisitos:
- Haber ejecutado las pruebas de kraken de los `features_ghost3` y `features_ghost4`
- Contar con los directorios e imagenes en `.Kraken/screenshots/{nombre_configurad}/{id_screenshot}.png`.

#### Ejecución:
1. Ingresar al directorio `visual_regression` Ejemplo: `cd visual_regression`
2. Ejecutar el comando `npm install` para instalar las dependencias.
3. Configurar las pruebas, para ello ingreese al archivo `visual_regression/config.json` y modifique:
```json
{
    "url":"http://localhost:2368/ghost/#/site", //URL del sitio bajo pruebas
    "options":{
        "output": {
            "errorColor": {
                "red": 255,
                "green": 0,
                "blue": 255
            },
            "errorType": "movement",
            "largeImageThreshold": 1200,
            "useCrossOrigin": false,
            "outputDiff": true
        },
        "scaleToSameSize": true,
        "ignore": "antialiasing"
    },
    "baseVersion": "../Kraken/screenshots/{nombre_para_ghost3}",// Directorio configurado en ejecucion de kraken para Ghost en la version 3
    "compareVersion": "../Kraken/screenshots/{nombre_para_ghost4}"// Directorio configurado en ejecucion de kraken para Ghost en la version 4

}
```
4. Dentro del directorio `visual_regression/` Ejecutar pruebas con el comando `node index.js`
5. Revisar los resultados de las pruebas en el archivo: `visual_regression/results/{fecha_ejecucion}/report.html`


## Playwright

### Prerequisitos:
- NodeJs 14 o posterior
- Instancia Ghost V3.41.1 disponible 
- Instancia Ghost V4.4.0 disponible

### Ejecución de pruebas:
1. Ejecutar el comando `npm install`
2. Configurar el archivo `util/environment.ts` con los parametros comentados (`BASE_URL`, `USER`, `PASS`)
![image](https://user-images.githubusercontent.com/98668775/168510550-069b32ab-d3eb-4ae4-99e7-2775191c3ed2.png)
3. Ejecutar el comando `npx playwright test`. Los proveedores de este código comentan que detectaron anomalías al ejecutar los scripts como un test suite único. En caso de ver lo mismo, ejecutarlos por separado usando el comando `npx playwright test test/PS-withscreenshots-XY.test.ts` ajustando según el script a ejecutar.
4. Verificar que se haya creado la carperta `screenshots` con subcarpetas tipo 'PA0XY' (e.g. PA001)

### Ejecución de pruebas de regresión visual (ejemplo)

#### Prerequisitos:
1. Ingresar a carpeta Playwright
2. Crear una carpeta llamada `vrt`
3. Levantar una instancia Ghost de comparación "previa" (una versión antigua a la que esté probando, digamos 3.40)
4. Ejecutar scripts deseado según seccion de Ejecución de pruebas.
5. Crear una carpeta llamada `aplicacion-x` dentro de la carpeta `vrt` y copiar las carpetas generadas en `screenshots`, por ejemplo:
```json
PA001
PA002
PA008
PA011
PA012
```
6. Levantar la instancia Ghost de comparación "actual" (asumimos en este caso 3.41)
7. Ajustar `util/environment.ts` si lo considera necesario
8. Crear una carpeta llamada `aplicacion-x-1` dentro de la carpeta `vrt`y copiar las carpetas nuevas en `screenshots`, en este ejemplo:
```json
PA001
PA002
PA008
PA011
PA012
```
#### Ejecución herramienta comparativa de screenshots:
1. Seguir las instrucciones previas de Playwright
2. Ingresar a carpeta visual_regression
4. Ejecutar el comando `npm install` para obtener las dependencias.
5. Modificar el archivo config.json para establecer las rutas de las carpetas que seras comparadas
```json
{
    "url":"http://localhost:3002/ghost/#/site", //URL del sitio bajo pruebas
    "options":{
        "output": {
            "errorColor": {
                "red": 255,
                "green": 0,
                "blue": 255
            },
            "errorType": "movement",
            "largeImageThreshold": 1200,
            "useCrossOrigin": false,
            "outputDiff": true
        },
        "scaleToSameSize": true,
        "ignore": "antialiasing"
    },
    "baseVersion": "../Playwright/vrt/aplicacion-x",// Directorio creado previamente
    "compareVersion": "../Playwright/vrt/aplicacion-x-1"// Directorio creado previamente

}
```
5. Ejecutar el comando `node index.js`
6. Verificar el reporte generado dentro de la carpeta  `results`

Naturalmente puede que los scripts en la versión de Ghost que vaya a probar no sirvan. Los proveedores del código dicen que probaron una versión 3 de Ghost, no debería tener problema para esta estrategia su reuso.
