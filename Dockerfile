# 基础镜像使用Node.js
FROM node:14

# 设置工作目录
WORKDIR /jianzhi-portal

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目文件复制到工作目录
COPY . .

# 声明构建参数,定义默认值
ARG VUE_APP_BASE_API_HOST=http://127.0.0.1
# 将构建参数转为环境变量
ENV VUE_APP_BASE_API_HOST=$VUE_APP_BASE_API_HOST

# 构建Vue应用
RUN npm run build

# 使用nginx作为服务器
FROM nginx:alpine
COPY --from=0 /jianzhi-portal/dist /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx，服务启动时执行的命令
CMD ["nginx", "-g", "daemon off;"]