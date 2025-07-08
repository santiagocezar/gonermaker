//@ts-check
import { spawn } from "child_process"
import { writeFile } from "fs/promises"

/**
 * @param {GM.Image} img 
 */
export async function buildImages(img) {
    if (img.pull) {
        await run([
            "podman", "pull", img.tag
        ])
    } else {
        const args = Object.entries(img.args).flatMap(([key, val]) => ["--build-arg", `${key}=${val}`])

        await run([
            "podman", "build", 
            img.path, 
            "-t", img.tag,
            "--build-context", `base=docker-image://${img.base}`,
            ...args
        ])
    }

    await Promise.all(img.children.map(buildImages))
}


/**
 * @param {GM.Image} img 
 */
export async function assembleDistrobox(img) {    
    const ini = flattenImages(img)
        .map((img) => (
            !img.pull && img.distrobox && 
                `[${img.distrobox.name}]\n` + (
                    Object.entries(img.distrobox).map((kv) => kv.join("=")).join("\n")
                )
        ))
        .filter(Boolean)
        .join("\n")
        .replaceAll(/^\s+/gm, "") // is this needed?

    console.log("Generated distrobox.ini:")
    console.log(ini)

    await writeFile("distrobox.ini", ini) // can't pipe it from stdin lol
    await run("distrobox assemble create -R")
}

/**
 * @param {GM.Image} img
 * @returns {GM.Image[]}
 */
export function flattenImages(img) {
    return [{...img, children: []}, ...img.children.flatMap(flattenImages)]
}

/**
 * @param {string | string[]} command
 * @returns {Promise<number>}
 */
export function run(command) {
    return new Promise((resolve, reject) => {
        const argv = typeof command === "string"
            ? command.split(" ")
            : command

        const process = spawn(argv[0], argv.slice(1), { stdio: 'inherit' })
        
        process.on("error", (err) => {
            reject(err)
        })

        process.on("exit", (code, signal) => {
            code === null ? reject(new Error(`process ${JSON.stringify(argv)} killed by signal ${signal}`)) :
            code > 0 ? reject(new Error(`process ${JSON.stringify(argv)} exited with code ${code}`)) : 
            resolve(code)
        })
    })
}

/**
 * @param {GM.Image} images 
 */
export async function createVessel(images) {
    await buildImages(images)
    await assembleDistrobox(images)
}