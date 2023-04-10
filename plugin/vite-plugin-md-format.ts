import { PluginOption } from 'vite'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import YAML from 'yaml'

const fileRegex = /\.(md)$/

function randomString(len: number) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

const compileMDToTS = (src: string, id: string) => {
  const urlMap = new Map<string, string>()
  const pathSet = new Set<string>()
  const randomSet = new Set<string>()
  let metadata = {}
  const toc: any[] = []

  const transURL = (data: any) => {
    if (!data) return
    const src = data?.properties?.src as string | undefined

    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
      let s: string
      if (!pathSet.has(src)) {
        s = '_' + randomString(29)
        urlMap.set(s, src)
        urlMap.set(src, s)
        pathSet.add(src)
        randomSet.add(s)
      } else {
        s = urlMap.get(src) || ''
      }
      data.properties = {
        ...data.properties,
        src: s,
      }
    }
    if (data?.children?.length) data.children.forEach((v: any) => transURL(v))
  }

  const getMetadata = (tree: any) => {
    tree.children.forEach(({ type, value }: { type: any; value: any }) => {
      if (type === 'yaml') {
        metadata = YAML.parse(value)
      }
    })
  }

  const getTOC = (tree: any) => {
    tree.children.forEach((line: any) => {
      if (line.type === 'heading') {
        toc.push({
          label: line.children[0].value,
          level: line.depth,
        })
      }
    })
  }

  const addId2Heading = (tree: any) => {
    tree.children.forEach((element: any) => {
      if (
        element.tagName === 'h1' ||
        element.tagName === 'h2' ||
        element.tagName === 'h3'
      ) {
        element.properties['id'] = element.children[0].value
          .split(' ')
          .join('-')
          .toLowerCase()
      }
    })
  }

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(() => getMetadata)
    // @ts-ignore
    .use(() => getTOC)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(() => addId2Heading)
    // @ts-ignore
    .use(() => transURL)
    // @ts-ignore
    .use(rehypeStringify)

  let tsxString = processor.processSync(src).toString()

  const randomStrings = Array.from(randomSet)
  const importStrings = randomStrings.map(
    (v, i) => `import ${v} from "${urlMap.get(v)}";`,
  )

  randomStrings.forEach(s => {
    tsxString = tsxString.replaceAll(`"${s}"`, `"\${${s}}"`)
  })
  const result = `  ${importStrings.join('\n')}
  const assetURLs=[${randomStrings.join(',')}];
  const metadata=${JSON.stringify(metadata)};
  const toc=${JSON.stringify(toc)}
  export {
      assetURLs,
      metadata,
      toc
  }
  export default \`${tsxString.replace('`', '\\`')}\`
  `

  return result
}

export default function vitePluginMDFormat(): PluginOption {
  return {
    name: 'vite-plugin-md-format',
    enforce: 'pre',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compileMDToTS(src, id),
          map: null, // 如果可行将提供 source map
        }
      }
    },
  }
}
