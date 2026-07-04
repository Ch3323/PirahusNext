const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      replaceInDir(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const original = content;
      // replace variations of importing from infra/container
      content = content.replace(/from ["']@\/src\/infra\/container["']/g, 'from "@/src/clients/container"');
      content = content.replace(/from ["']\.\.\/\.\.\/infra\/container["']/g, 'from "@/src/clients/container"');
      content = content.replace(/from ["']\.\.\/\.\.\/\.\.\/infra\/container["']/g, 'from "@/src/clients/container"');
      content = content.replace(/from ["']\.\.\/infra\/container["']/g, 'from "@/src/clients/container"');
      content = content.replace(/from ["']\.\/infra\/container["']/g, 'from "@/src/clients/container"');
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
