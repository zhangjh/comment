FROM njhxzhangjh/web_base:2.0

WORKDIR ./

COPY ./ /comment

## comment
RUN cd /comment && npm i
RUN npm run start &> comment.log &
