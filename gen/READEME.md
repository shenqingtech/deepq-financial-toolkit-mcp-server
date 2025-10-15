# 1. auth-server获取token

```shell
curl --request POST \
--url https://auth-server.deepq.tech/oauth2/token \
--header 'content-type: application/x-www-form-urlencoded' \
--data grant_type=client_credentials \
--data scope=api \
--data client_id=pB2zG6tU0iK8fH0eX4zP8hH5sJ9tG1zT \
--data client_secret=uB4xZ7zO7dG2pB7mR6aS0sP0bN5pD5rL
```

# 2.将token设置到环境变量

```shell
export DEEPQ_API_KEY="I0tcWM7RR8A1YBhu2eCHIQ"
```

# 3.启动调试工具

```shell
export DANGEROUSLY_OMIT_AUTH="true"
npx @modelcontextprotocol/inspector
```

# 4.本地调试

### **方式一：使用命令生成工具定义并调试**

这种方式会将工具定义持久化到文件中。

```shell
node <absolute-path-to-parent-directory>/mcp-server-js/gen/cli-dev.mjs generate
node <absolute-path-to-parent-directory>/mcp-server-js/cli.mjs
```

### **方式二：在内存中生成工具定义直接调试**

这种方式更快，但工具定义不会被保存，适合快速验证。

```shell
node <absolute-path-to-parent-directory>/mcp-server-js/gen/cli-dev.mjs start
```

# 5.发布NPM

```shell
#开发者在发布前手动需要执行此命令以生成新的tools-manifest.json
node <absolute-path-to-parent-directory>/mcp-server-js/gen/cli-dev.mjs generate

npm version patch
npm publish --access public
```

# 6.客户使用

```shell
npx @deepq-tech/mcp-server-js@latest
```