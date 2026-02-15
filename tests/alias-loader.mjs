import path from "node:path"
import { pathToFileURL } from "node:url"

const buildRoot = path.resolve(process.cwd(), ".tmp-test")

export function resolve(specifier, context, defaultResolve) {
  if (!specifier.startsWith("@/")) {
    return defaultResolve(specifier, context, defaultResolve)
  }

  const compiledPath = path.join(
    buildRoot,
    path.extname(specifier) ? specifier.slice(2) : `${specifier.slice(2)}.js`,
  )

  return {
    url: pathToFileURL(compiledPath).href,
    shortCircuit: true,
  }
}
