#!/bin/sh -ex
cat << 'EOM'

  /$$$$$$                                /$$      
 /$$__  $$                              | $$      
| $$  \__/  /$$$$$$   /$$$$$$   /$$$$$$ | $$   /$$
|  $$$$$$  /$$__  $$ |____  $$ /$$__  $$| $$  /$$/
 \____  $$| $$  \ $$  /$$$$$$$| $$  \__/| $$$$$$/ 
 /$$  \ $$| $$  | $$ /$$__  $$| $$      | $$_  $$ 
|  $$$$$$/| $$$$$$$/|  $$$$$$$| $$      | $$ \  $$
 \______/ | $$____/  \_______/|__/      |__/  \__/
          | $$                                    
          | $$                                    
          |__/                                    
EOM

# echo
# echo "\033[1;33m[Prep]:\033[0m Setting up your environment... \c"
# ts-node scripts/typescript/00_setup.ts
# echo "\033[1;32m[DONE]\033[0m"

# echo
# echo "\033[1;34m[Step 1]:\033[0m Compiling sample Spark contracts (ERC1155)... \c"
# ts-node scripts/typescript/01_compile.ts
# echo "\033[1;32m[DONE]\033[0m"

# echo
# echo "\033[1;34m[Step 2]:\033[0m Basic testing of compiled contracts... \c"
# ts-node scripts/typescript/01_compile.ts
# echo "\033[1;32m[DONE]\033[0m"

# echo
# echo "\033[1;34m[Step 3]:\033[0m ✨ Deploying Spark contracts on StarkNet Testnet... \c"
# ts-node scripts/typescript/02_deploy.ts
# echo "\033[1;32m[DONE]\033[0m"

# echo
# echo "\033[1;32m[Finish]:\033[0m 🔥 Let's build your next L2 product on StarkNet!"
