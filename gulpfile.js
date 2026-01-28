import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import terser from 'gulp-terser'
import sharp from 'sharp'

const sass = gulpSass(dartSass)

/**
 * Directorio CSS
*/
export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass(
            {outputStyle: 'compressed'}
        ).on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: '.' }))

    done()
}

/**
 * Directorio JS
 * terser() = minifica el archivo
*/
export function js(done) {
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'))
    done()
}

/**
 * Directorio de Imagenes
*/
export async function imagenes(done) {
    const srcDir = 'src/img/';
    const buildDir = 'build/img/';
    const images =  await glob('src/img/**/*{png,jpg,jpeg}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}
function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    // const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    // const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    // sharp(file).jpeg(options).toFile(outputFile)   /** Imagenes JPG,JPEG */
    sharp(file).webp(options).toFile(outputFileWebp)  /** Imagenes Webp */
    // sharp(file).avif().toFile(outputFileAvif)    /** Imagenes Avif */
}

/**
 * Watcher
*/
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png,jpg,jpeg}', imagenes)
}


/**
 * Ejecutando las tareas en npm
 * Series = arranca una tarea, la finaliza, y avanza a la siguiente
 * Parallel = arranca todas las tareas al mismo tiempo
*/
export default series( css, js, imagenes, dev)