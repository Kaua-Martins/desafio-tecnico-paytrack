const fs = require("fs");
const path = require("path");

function generateRelatorio(data) {
    const {
        totalOfUsers,
        numberUser18,
        insertedUsers,
        updatedUsers,
        numberUserUnder18,
        problemas
    } = data;

    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].replace(/:/g, "-");

    const fileName = `relatorio_${date}_${time}.txt`;
    const filePath = path.resolve(__dirname, fileName);

    let problemastxt = "Nenhuma inconsistência encontrada.\n";

    if (problemas && problemas.length > 0) {
        problemastxt = problemas.map((p, index) => {
            return `
            ${index + 1}) Email: ${p.email || "N/A"}
            Motivo: ${p.motivo}
            Campo: ${p.campo || "-"}
            `;
        }).join("\n");
    }

    const content = `
== Relatório ==
Data/Hora: ${date} ${time}
Total recebidos : ${totalOfUsers}
Maiores de 18 anos : ${numberUser18}
Inseridos : ${insertedUsers}
Atualizados : ${updatedUsers}
Ignorados : ${numberUserUnder18}
Inconsistências : ${problemastxt}
        `;

    fs.writeFileSync(filePath, content.trim(), { encoding: "utf-8" });

    return filePath;
}

module.exports = {
    generateRelatorio
};