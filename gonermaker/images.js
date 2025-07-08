//@ts-check
import { join } from "path"

/**
 * @param {string} tag 
 * @param {((base: string) => GM.BuildImage)[]} children 
 * @returns {GM.PullImage}
 */
export function pull(tag, children) {
    return {
        pull: true,
        tag,
        children: children.map(img => img(tag))
    }
}

/**
 * @param {string} path 
 * @param {((base: string) => GM.BuildImage)[]} children 
 * @param {{tag?: string, args: object}} opts 
 * @returns {(base: string) => GM.BuildImage}
 */
export function image(path, children, opts) {
    const tag = opts?.tag || path
    /**
     * @param {string} base
     */
    return (base) => ({
        pull: false,
        path: join("images", path),
        tag,
        args: opts?.args ?? {},
        base,
        children: children.map(img => img(tag)),
    })
}

/**
 * @param {object} opts written to the distrobox.ini
 */
export function distrobox(opts) {
    /**
     * @param {string} base
     */
    return (base) => {
        const tag = `${base}-dx`
        const i = image("img-dx", [], {
            tag,
            args: {
                USER: process.env.USER,
                UID: process.getuid?.(),
                GID: process.getgid?.(),
            }
        })
    
        return {
            ...i(base),
            distrobox: {
                name: tag,
                init: false,
                pull: false,
                root: false,
                start_now: false,
                ...opts,
                image: `${tag}:latest`,
            },
        }
    }
}