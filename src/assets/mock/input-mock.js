const sampleData = require('./list-input.json');

export const getSampleList = () => JSON.parse(JSON.stringify(sampleData));
