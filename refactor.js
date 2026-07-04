const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src', 'services');
const files = ['hint.service.ts'];

for (const file of files) {
  let content = fs.readFileSync(path.join(servicesDir, file), 'utf8');

  const repoRegex = /const (\w+Repo) = new (\w+Repository)\(\);/g;
  let match;
  let repos = [];
  while ((match = repoRegex.exec(content)) !== null) {
    repos.push({ name: match[1], className: match[2], interfaceName: 'I' + match[2] });
  }

  if (repos.length > 0) {
    content = content.replace(/const \w+Repo = new \w+Repository\(\);\n?/g, '');

    let constructorParams = repos.map(r => 
      `private readonly ${r.name}: ${r.interfaceName} = new ${r.className}()`
    ).join(',\n    ');
    
    let constructorCode = `\n  constructor(\n    ${constructorParams}\n  ) {}\n`;

    content = content.replace(/export class (\w+Service) \{/, `export class $1 {${constructorCode}`);

    let importCode = repos.map(r => {
      let kebabName = r.className.replace('Repository', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '.repository.port';
      return `import { ${r.interfaceName} } from "@/src/core/ports/server/${kebabName}";`;
    }).join('\n');
    
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLastImport + 1) + importCode + '\n' + content.slice(endOfLastImport + 1);
    }

    for (const r of repos) {
      let reg = new RegExp(`(?<!this\\.)\\b${r.name}\\.`, 'g');
      content = content.replace(reg, `this.${r.name}.`);
    }

    fs.writeFileSync(path.join(servicesDir, file), content);
    console.log('Updated ' + file);
  }
}
