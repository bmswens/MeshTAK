FROM node:22 AS build

ARG VERSION_INFO=DEV

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install 
COPY . ./
RUN npm run build

# final stage
FROM node:22

LABEL maintainer="bmswens@gmail.com"
EXPOSE 80

WORKDIR /app

COPY --from=build /app/dist ./dist
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "dist", "--listen", "80"]