export class DadosColetados {
    constructor(dados) {
        this.dados = dados;
    }

    buscarPorId(id) {
        return this.dados.filter(item => item.id === id);
    }

    filtrarPorData(data) {
        return this.dados.filter(item => item.data === data);
    }

    ordernarPorDataDesc() {
        return [...this.dados].sort((a, b) => new Date(b.data) - new Date(a.data));
    }

    formatarPeso(peso) {
        return `${peso.toLocaleString('pt-BR')} kg`;
    }

    formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

}