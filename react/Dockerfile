# build environment
FROM node:14 as build
WORKDIR /app
COPY react_app .
# ENV REACT_APP_CONFIG_API_SERVER="/"
# ENV REACT_APP_CONFIG_MEILISEARCH_API="http://migration.analystt.ai"
# for team page logo api
# ENV REACT_APP_CONFIG_LOGO_API="https://logo.clearbit.com/"
# ENV REACT_APP_CONFIG_MEILISEARCH_API_MASTERKEY="LRzRKZELkEsuadIuDnDWsKGWVqChZUow"
RUN yarn
RUN yarn build
# RUN npm start

# deploy environment
# FROM nginx:latest
# WORKDIR /usr/src/app
# COPY --from=build /app/build /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

