export default class Mensagens {

    static formatarLitros(litros) {
        return `${litros.toFixed(0)}L`;
    }

    static formatarHorario(data = new Date()) {
        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    static gerarMensagensConsumo(litros) {
        return `Consumo energético de ${this.formatarLitros(litros)} em uma hora`;
    }

    static gerarMensagensAbastecimento(data = new Date()) {
        return `Parada para abastecimento às ${this.formatarHorario(data)}`;
    }

    static gerarMensagensManutencao(km) {
        return `Está acontecendo uma manutenção no km ${km} dos trilhos.`
    }

    static gerarMensagensPontoManutencao(km) {
        return `Ponto de parada para manutenção em ${km}km.`
    }

    static gerarMensagensObstrucao(causa) {
        return `Possível obstrução nos trilhos, ${causa}.`
    }

    static gerarMensagensEqpManutencao(km) {
        return `Solicitando PARADA daqui à ${km}km.`
    }

    static gerarMensagensAtencao(causa) {
        return `Vazamento de fluídos no freio ${causa}.`
    }

}

