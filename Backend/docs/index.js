// const { default: components } = require("./components");
const servers = require("./server");
const components = require('./components')
const tags = require('./tags')
const basicInfo = require('./basicInfo')
const index = {
    ...servers,
    ...components,
    ...tags,
    basicInfo,

}