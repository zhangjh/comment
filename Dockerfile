FROM node:10

WORKDIR /comment
COPY ./ /comment

## comment
RUN npm i 
EXPOSE 3001

CMD ["npm", "run", "start"]
