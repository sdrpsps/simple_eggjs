# simple_eggjs



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### 首先简单的说一下在哪里写代码
- 我们主要用到的是controller文件夹，service文件夹，router.js， 还有我们之前创建的urls.js

- 在controller中创建文件，在文件内书写逻辑
- 在service中创建对应文件，主要是查询数据库
- 在urls.js中定义接口
- 在router.js中进行挂载