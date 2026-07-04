const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'core', 'service');
const destDir = path.join(__dirname, 'src', 'clients', 'services');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

for (const file of files) {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
    
    // Replace imports
    content = content.replace(/from "\.\.\/ports\/([^"]+)\.repository"/g, (match, p1) => {
      return `from "../repositories/${p1}.repository"`;
    });
    
    // Replace I<Name>Repository with <Name>ClientRepository
    content = content.replace(/I([A-Z][a-zA-Z0-9]*)Repository/g, '$1ClientRepository');
    
    // Replace relative paths to absolute paths for core
    content = content.replace(/from "\.\.\/domain\//g, 'from "@/src/core/domain/');
    content = content.replace(/from "\.\.\/schema\//g, 'from "@/src/core/schema/');
    content = content.replace(/from "\.\.\/error\//g, 'from "@/src/core/error/');
    content = content.replace(/from "\.\.\/lib\//g, 'from "@/src/lib/');
    
    fs.writeFileSync(path.join(destDir, file), content);
    console.log(`Migrated ${file}`);
  }
}
