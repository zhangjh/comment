FROM njhxzhangjh/web_base:2.0

WORKDIR ./

COPY ./ /comment

## comment
RUN npm i
RUN npm run start &> comment.log &
