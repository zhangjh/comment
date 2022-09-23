FROM njhxzhangjh/web_base:2.0

WORKDIR /root/web/comment

COPY ./ /root/web/comment

## comment
RUN cd /root/web/comment
RUN npm i -d && npm run start 
