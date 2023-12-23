import Jimp from 'jimp';
import { randomBytes } from 'crypto'

async function overlayImages(baseOverlay = [], imagen = {}) {
    try {
        const base = await Jimp.read(baseOverlay[0]).catch(error => { throw new Error(`Error al leer la imagen base: ${error}`) })
        const overlay = await Jimp.read(baseOverlay[1]).catch(error => { throw new Error(`Error al leer la imagen de superposición: ${error}`) })
        const composite = (text) => { return base.composite(overlay, text[0], text[1]) }
        const ImagenOverlay = {
            baseAjuste: imagen.Ajustebase || false,
            tamano: imagen.tamano || [overlayWidth, overlayHeight],
            centrar: imagen.centrar || false,
            localizacion: imagen.localizacion || false
        }
        const baseWidth = base.bitmap.width
        const baseHeight = base.bitmap.height
        const overlayWidth = imagen.tamano[0]
        const overlayHeight = imagen.tamano[1]
        const numero = [
            ImagenOverlay.centrar == true ?
                [false, 0] : Array.isArray(ImagenOverlay.centrar) ?
                    ImagenOverlay.centrar : [false, 0],
            ImagenOverlay.localizacion == false ?
                [false, 0] : Array.isArray(ImagenOverlay.localizacion) ?
                    ImagenOverlay.localizacion : [false, 0]
        ]
        const options = {
            centrar: [
                base.bitmap.width - overlay.bitmap.width / 2,
                base.bitmap.height - overlay.bitmap.height / 2
            ],
            esquina: {
                arribaIzquierda: [numero[1][1], numero[1][1]],
                arribaDerecha: [(baseWidth - overlayWidth) - numero[1][1], numero[1][1]],
                abajoIzquierda: [numero[1][1], (baseHeight - overlayHeight) - numero[1][1]],
                abajoDerecha: [(baseWidth - overlayWidth) - numero[1][1], (baseHeight - overlayHeight) - numero[1][1]]
            },
            centro: {
                Arriba: [(baseWidth - overlayWidth) / 2, numero[0][1]],
                Abajo: [(baseWidth - overlayWidth) / 2, ((baseHeight - overlayHeight) - (numero[0][1]))],
                Izquierda: [numero[0][1], (baseHeight - overlayHeight) / 2],
                Derecha: [((baseWidth - overlayWidth) - (numero[0][1])), (baseHeight - overlayHeight) / 2]
            }
        }

        if (ImagenOverlay.baseAjuste) { overlay.resize(base.bitmap.width, base.bitmap.height) } else {
            if (ImagenOverlay.tamano) overlay.resize(ImagenOverlay.tamano[0], ImagenOverlay.tamano[1])
            if (ImagenOverlay.centrar) {
                if (ImagenOverlay.centrar == true) composite(options.centrar)
                else if (Array.isArray(ImagenOverlay.centrar)) {
                    const Options = ImagenOverlay.centrar[0]
                    const centro = options.centro
                    Options == 'arriba' ? composite(centro.Arriba) : Options == 'abajo' ? composite(centro.Abajo) : Options == 'izquierda' ? composite(centro.Izquierda) : Options == 'derecha' ? composite(centro.Derecha) : null
                }
            }
            else if (Array.isArray(ImagenOverlay.localizacion)) {
                if (typeof ImagenOverlay.localizacion[0] === 'number') composite(ImagenOverlay.localizacion)
                else if (typeof ImagenOverlay.localizacion[0] === 'string') {
                    const Options = ImagenOverlay.localizacion[0]
                    const centro = options.esquina
                    Options == 'arribaIzquierda' ? composite(centro.arribaIzquierda) : Options == 'arribaDerecha' ? composite(centro.arribaDerecha) : Options == 'abajoIzquierda' ? composite(centro.abajoIzquierda) : Options == 'abajoDerecha' ? composite(centro.abajoDerecha) : null
                }
            }
        }

        const fileName = randomBytes(3).toString('hex');
        const outputPath = `./tmp/${fileName}.jpg`;
        await base.writeAsync(outputPath);
        return { path: outputPath };

    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function generateProfilePicture(buffer) {
    try {
        const jimp = await Jimp.read(buffer)
        const min = jimp.getWidth()
        const max = jimp.getHeight()
        const cropped = jimp.crop(0, 0, min, max)
        return { img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG), preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG) }
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

export { overlayImages, generateProfilePicture}