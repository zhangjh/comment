FROM njhxzhangjh/web_base:2.0

WORKDIR ./

COPY ./ /comment

## comment
RUN npm i
