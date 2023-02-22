# Newssystem - 新闻发布管理平台

# 安装依赖组建
npm install

# 运行
json-server --watch db.json --port 3000
npm run start

# 打包
npm run build

#### 介绍
这是一个React全家桶联系项目，业务为新闻后台管理
实现一个新闻发布管理平台，业务目标：
* 用户登录
* 游客访问：浏览新闻
* 用户管理：新增用户、修改用户、删除用户、禁用用户
* 权限管理：角色管理、页面访问权限控制、侧边栏权限控制
* 新闻业务：撰写新闻、草稿箱、新闻审核、新闻发布及下线等

#### 技术选型
* [create-react-app](https://www.html.cn/create-react-app/docs/proxying-api-requests-in-development/)：脚手架
* [React Hooks](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)：函数式编程，用过的都说真的爽
* [React Router V6](https://reactrouterdotcom.fly.dev/docs/en/v6/upgrading/v5#remove-redirects-inside-switch)：路由控制访问，V6升级了许多东西
* [Recat Redux](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts/)：状态管理，组件通信
* [Antd组件库](https://ant.design/components/overview-cn/)：你为什么要使用react？
* [axios](https://www.axios-http.cn/docs/intro):实现网络请求
* [JSON Server](https://www.npmjs.com/package/json-server):生成数据接口
* [react-tsparticles](https://www.npmjs.com/package/react-tsparticles):登陆页面粒子美化
* [draft-js](https://draftjs.org/docs/quickstart-rich-styling)：富文本编辑
* [draftjs-to-html]():富文本转换html
* [html-to-draftjs]():html转换富文本
* [Echarts](https://echarts.apache.org/handbook/zh/get-started/)：数据可视化（柱状图、饼图）
* [Sass](https://www.sass.hk/docs/): CSS辅助工具，实现变量、嵌套、导入
* [http-proxy-middleware](https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually):开发环境反向代理跨域（前期使用练手，JSON Server不需要~）；引入后需要重启服务器
* CSS Modules: CSS模块化，选取class```.moduleTest```或id选择器，将CSS module文件引入style变量，设置```className={style.moduleTest}```

#### 文档
请参考[项目文档](https://www.cnblogs.com/shixiu/p/15983351.html)

### 版本介绍
* react: "^18.2.0",
* react-dom: "^18.2.0"
* react-redux: "^8.0.5",
* react-router-dom: "^6.2.2",
* redux: "^4.2.0",