import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import packageName from 'depcheck-package-name'
import fs from 'fs-extra'
import P from 'path'

import self from './index.js'

export default tester(
  {
    subdir: {
      cwd: 'sub',
      files: {
        'babel.config.js': endent`
          module.exports = {
            presets: [
              ['${packageName`@babel/preset-env`}', { targets: { node: 14 } }],
            ],
          }
        `,
        'sub/src/index.js': endent`
          import foo from 'foo'

          export default foo
        `,
      },
      async test() {
        expect(
          await fs.readFile(P.join('sub', 'dist', 'index.js'), 'utf8'),
        ).toMatchSnapshot(this)
      },
    },
    works: {
      files: {
        'babel.config.js': endent`
          module.exports = {
            presets: [
              ['${packageName`@babel/preset-env`}', { targets: { node: 14 } }],
            ],
          }
        `,
        'src/index.js': endent`
          import foo from 'foo'

          export default foo
        `,
      },
      async test() {
        expect(
          await fs.readFile(P.join('dist', 'index.js'), 'utf8'),
        ).toMatchSnapshot(this)
      },
    },
  },
  [self('babel.config.js')],
)
