const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  ); // Se o locale estiver como undefined , ele irá selecionar o locale do sistema

export default formatValue;
