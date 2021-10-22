const loadModule = (moduleList) => moduleList.map((name) => require(name));
module.exports = loadModule;