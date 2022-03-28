// import { readFile, lstat } from 'fs/promises'
import { resolve } from 'path'

// const viewsDir = resolve(__dirname, './_posts')

const choiceList = ['设计模式']

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('post', {
    description: '发布文档',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: '请选择需要创建的文档类型',
        choices: choiceList,
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入要发布的文档名称：',
        validate(v) {
          if (!v || v.trim === '') {
            return '文件名不能为空'
          } else {
            return true
          }
        },
      },
    ],
    actions(data) {
      return [
        {
          type: 'add',
          path: `_posts/{{name}}.md`,
          templateFile:
            data.type === '设计模式'
              ? './_drafts/2010-01-01-template.md'
              : './_drafts/2010-01-01-normaltemplate.md',
        },
      ]
    },
  })
}
