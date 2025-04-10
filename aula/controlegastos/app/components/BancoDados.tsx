import * as SQLite from 'expo-sqlite';

export const bcodados = SQLite.openDatabaseSync('gastos.db');

const iniciar = () => {

    bcodados.execSync('CREATE TABLE IF NOT EXISTS gastos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, descricao TEXT NOT NULL, valor REAL NOT NULL)');

    console.log("Banco de dados iniciado");
}

export const inserir = (descricao: string, valor: number) => {

    const ret = bcodados.runSync('INSERT INTO gastos (descricao, valor) VALUES(?, ?)', [descricao, valor]);
    return ret;

}

export const listar = () => {

    return bcodados.getAllSync('SELECT * from gastos');

}

export default iniciar;