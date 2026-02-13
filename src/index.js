const { fetchRandomUsers } = require("./services/ramdomUsersService");
const { findEmail, insertUser, updateUser, findAllUsers } = require("./repositories/userRepository");
const readline = require("readline");
const { generateRelatorio } = require("./relatorios/relatorioService");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("");
    console.log("== MENU ==");
    console.log("1 - Executar");
    console.log("2 - Mostrar tabela usuarios");
    console.log("3 - Sair");

    rl.question("Escolha uma opção:", async (option) => {
        switch (option) {
            case "1":
                await consultIntegracao();
                showMenu();
                break;
            case "2":
                const tabela = await findAllUsers();
                console.log(tabela);
                showMenu();
                break;
            case "3":
                rl.close();
                break;
        }
    });
}

async function consultIntegracao() {
    const users = await fetchRandomUsers();

    let totalOfUsers = users.length, numberUser18 = 0, numberUserUnder18 = 0, updatedUsers = 0, insertedUsers = 0;
    let problemas = [];

    for (const i of users) {

        if (!i.email) {
            problemas.push({
                campo: "email",
                motivo: "Email ausente",
                valor: i.email
            });
            continue;
        }

        if (!i.age) {
            problemas.push({
                campo: "age",
                motivo: "Data de nascimento ausente",
            });
            continue;
        }

        if (i.age < 18 || i.email == null) {
            numberUserUnder18++;
            continue;
        }

        numberUser18++;

        const user = {
            email: i.email,
            sexo: i.gender,
            nome: i.first_name,
            sobrenome: i.last_name,
            data_nascimento: i.dob,
            celular: i.cell,
            pais: i.country
        }

        const existUser = await findEmail(user.email);

        if (existUser) {
            await updateUser(user);
            updatedUsers++;
        } else {
            await insertUser(user);
            insertedUsers++;
        }
    }

    const reportPath = generateRelatorio({
        totalOfUsers: totalOfUsers,
        numberUser18: numberUser18,
        insertedUsers: insertedUsers,
        updatedUsers: updatedUsers,
        numberUserUnder18: numberUserUnder18
    });

}

showMenu();