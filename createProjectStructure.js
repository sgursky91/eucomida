const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, 'src');

const structure = {
  'assets': ['logo-sacola.png', 'placeholder-image.png'],
  'components': ['Button.tsx', 'Input.tsx'],
  'context': ['AuthContext.tsx'],
  'navigation': ['AppNavigator.tsx'],
  'routes': ['index.tsx'],
  'screens': [
    'HomeScreen.tsx',
    'LoginScreen.tsx',
    'ProductListScreen.tsx',
    'ProductRegisterScreen.tsx',
    'RegisterScreen.tsx',
    'StoreListScreen.tsx',
    'StoreRegisterScreen.tsx',
  ],
  'services': ['authService.ts', 'iaService.ts', 'productService.ts'],
  'styles': ['global.ts', 'home_styles.ts', 'register_styles.ts'],
  'types': ['loja.ts', 'navigation.ts', 'produto.ts', 'user.ts'],
  'utils': ['masks.ts', 'validators.ts'],
};

function createStructure(basePath, structure) {
  for (const [folder, files] of Object.entries(structure)) {
    const folderPath = path.join(basePath, folder);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📁 Criado: ${folderPath}`);
    } else {
      console.log(`✅ Pasta já existe: ${folderPath}`);
    }

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `// ${file} - criado automaticamente`);
        console.log(`📄 Criado: ${filePath}`);
      } else {
        console.log(`✅ Arquivo já existe: ${filePath}`);
      }
    }
  }
}

// Criar o diretório raiz
if (!fs.existsSync(projectRoot)) {
  fs.mkdirSync(projectRoot);
  console.log(`📁 Criado diretório raiz: ${projectRoot}`);
} else {
  console.log(`✅ Diretório raiz já existe: ${projectRoot}`);
}

// Executar a criação
createStructure(projectRoot, structure);
