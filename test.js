const bcrypt = require("bcrypt");

async function test() {
    const password = "Password@1234";

    const hash = "$2b$10$FgMCgHRi57Ckxc.a9AZ2Tu4fndaSur9.kzb9h/sWA7MgW3dLvXhUa";

    const result = await bcrypt.compare(password, hash);

    console.log("Result:", result);
}

test().catch(console.error);