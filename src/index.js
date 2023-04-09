import { execa } from 'execa'
import outputFiles from 'output-files'
import P from 'path'
import withLocalTmpDir from 'with-local-tmp-dir'

export default configPath => ({
  transform: test => {
    test = { test: () => {}, ...test }

    return function () {
      return withLocalTmpDir(async () => {
        await outputFiles({
          'package.json': JSON.stringify({}),
          ...test.files,
        })
        await execa(
          'babel',
          [
            '--extensions',
            '.js,.ts',
            '--out-dir',
            'dist',
            '--config-file',
            P.resolve(configPath),
            'src',
          ],
          { cwd: test.cwd },
        )
        await test.test.call(this)
      })
    }
  },
})
