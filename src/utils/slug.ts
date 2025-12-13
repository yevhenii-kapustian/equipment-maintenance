import slugify from "slugify"

export function buildSlug(name: string, id: string) {
    const base = slugify(name, {
        lower: true,
        strict: true,
    })

    return `${base}-${id.slice(0, 8)}`
}
