export {};
// const fs = require('fs');
// import formatters from ""

// const converter = (fn) => {
//   const load = `../data/orig/${fn}`;
//   const save = `../data/conv/${fn}`;
//   const file = fs.readFileSync(load);
//   const parsed = JSON.parse(file);
//   const formatted = { nodes: fmt.getFormattedNodes(parsed.nodes), edges: fmt.getFormattedEdges(parsed.edges) };
//   fs.writeFileSync(save, JSON.stringify(formatted));
//   return `${fn} Converted`;
// };

// const main = () => {
//   const fileNames = ['primary.json', 'sanity.json', 'stress.json'];
//   return fileNames.map(converter);
// };
