ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine 

WORKDIR /frontend

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN chown -R node:node /frontend

COPY . . 

USER node 

ENV NODE_ENV development

EXPOSE 3000 

CMD npm run dev 





