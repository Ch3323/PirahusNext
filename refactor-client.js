const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src', 'clients', 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.service.ts'));

for (const file of files) {
  let content = fs.readFileSync(path.join(servicesDir, file), 'utf8');

  // Replace type imports and definitions
  content = content.replace(/import \{ (\w+ClientRepository) \} from "(?:\.\.\/repositories\/\w+\.repository|@\/src\/clients\/repositories\/\w+\.repository)";/g, (match, className) => {
    let kebabName = className.replace('ClientRepository', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '.repository.port';
    return `import { I${className} } from "@/src/core/ports/client/${kebabName}";`;
  });

  // Replace constructor types
  content = content.replace(/constructor\(([^)]*)\)/g, (match, args) => {
    const newArgs = args.replace(/: (\w+ClientRepository)/g, ': I$1');
    return `constructor(${newArgs})`;
  });

  fs.writeFileSync(path.join(servicesDir, file), content);
  console.log('Updated ' + file);
}
