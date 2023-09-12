FROM node:17.3-alpine

WORKDIR /app
COPY package*.json ./
RUN apk update
RUN apk upgrade
RUN npm install -g npm@8.6.0
RUN npm install react-virtualized --legacy-peer-deps
RUN npm install @craco/craco --save --legacy-peer-deps
RUN npm config set legacy-peer-deps true
RUN npm install --save-dev eslint eslint-plugin-react
RUN npm install react-router-dom --save
RUN npm install @coreui/coreui --save
RUN npm install material-table @material-ui/core --save
RUN npm i react-scripts@latest
RUN npm update react-scripts
RUN npm install react-chartjs-2 chart.js --save
RUN npm install dayjs
RUN npm install react-tabulator
RUN npm install react-table

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
