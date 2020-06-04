/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillDelete,
  AiFillFileExcel,
  AiFillPlusCircle,
} from 'react-icons/ai';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import api from '../../services/api';
import Header from '../../components/Header';
import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  Buttons,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface ResponseDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  created_at: Date;
}

interface TransactionDTO {
  title: string;
  value?: number;
  type: string;
  category: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #5636d3',
        borderRadius: '10px',
        width: '700px',
        color: '#363F5F',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      title: {
        textAlign: 'center',
        width: '100%',
      },
      label: {
        marginTop: '10px',
      },
      select: {
        color: '#363F5F',
        '&:before': {
          borderColor: '#5636d3',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderColor: '#5636d3',
        },
      },
      button: {
        backgroundColor: '#FF872C',
        marginTop: '20px',
        color: '#fff',
        height: '40px',
        width: '140px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '10px',
        border: '0',
      },
      input: {
        borderRadius: '10px',
        flex: '1 1 auto',
        width: '100%',
        padding: '0 0 0 12px',
        border: '1px solid #5636d3',
        'label + input': {
          marginTop: '20px',
        },
        '&::placeholder': {
          color: '#a8a8b3',
        },
      },
    }),
  );

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionInput, setTransactionInput] = useState<TransactionDTO>({
    title: '',
    value: undefined,
    category: '',
    type: '',
  });
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const modalClasses = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenAddDialog = (): void => {
    setOpen(true);
  };

  function handleChangeTitle(title: string): void {
    const currentTransaction: TransactionDTO = { ...transactionInput };
    currentTransaction.title = title;
    setTransactionInput(currentTransaction);
  }

  function handleChangeType(type: string): void {
    const currentTransaction = { ...transactionInput };
    currentTransaction.type = type;
    setTransactionInput(currentTransaction);
  }

  function handleChangeCategory(category: string): void {
    const currentTransaction: TransactionDTO = { ...transactionInput };
    currentTransaction.category = category;
    setTransactionInput(currentTransaction);
  }

  function handleChangeValue(valueInput: string): void {
    const currentTransaction: TransactionDTO = { ...transactionInput };
    const value: number = +valueInput;
    currentTransaction.value = value;
    setTransactionInput(currentTransaction);
  }

  const handleCloseAddDialog = (): void => {
    setOpen(false);
  };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const response = await api.post<ResponseDTO>(
      '/transactions',
      transactionInput,
    );
    console.log(response);
    const currentTransactions = [...transactions];
    const newTransaction = {
      category: { title: response.data.category },
      id: response.data.id,
      created_at: new Date(),
      title: response.data.title,
      type: response.data.type,
      value: response.data.value,
    };
    currentTransactions.push(newTransaction);
    const currentBalance: Balance = balance;

    if (newTransaction.type === 'income') {
      currentBalance.income += newTransaction.value;
      currentBalance.total = currentBalance.income - currentBalance.outcome;
    } else {
      currentBalance.outcome += newTransaction.value;
      currentBalance.total = currentBalance.income - currentBalance.outcome;
    }
    setTransactions(currentTransactions);
    setOpen(false);
  }

  function handleDeleteTransaction(identifier: string): void {
    const transactionIndex: number = transactions.findIndex(
      transaction => transaction.id === identifier,
    );

    const currentTransactions: Transaction[] = [...transactions];
    const deletedTransaction = transactions[transactionIndex];
    const currentBalance: Balance = balance;

    currentTransactions.splice(transactionIndex, 1);

    if (deletedTransaction.type === 'income') {
      currentBalance.income -= deletedTransaction.value;
      currentBalance.total = currentBalance.income - currentBalance.outcome;
    } else {
      currentBalance.outcome -= deletedTransaction.value;
      currentBalance.total = currentBalance.income - currentBalance.outcome;
    }

    setTransactions(currentTransactions);
    setBalance(currentBalance);
  }

  function deleteTransaction(id: string): void {
    api.delete(`/transactions/${id}`).then(response => {
      handleDeleteTransaction(id);
    });
  }

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');
      setBalance(response.data.balance);
      setTransactions(response.data.transactions);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>
        <Buttons>
          <Link to="/import">
            <AiFillFileExcel size={20} />
          </Link>
          <button type="button" onClick={handleOpenAddDialog}>
            <AiFillPlusCircle size={20} />
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={modalClasses.modal}
            open={open}
            onClose={handleCloseAddDialog}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={modalClasses.paper}>
                <h2 id="transition-modal-title" className={modalClasses.title}>
                  Adicionar uma transação
                </h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">Título:</label>
                  <br />
                  <input
                    placeholder="Digite o título da transação"
                    value={transactionInput.title}
                    onChange={e => handleChangeTitle(e.target.value)}
                    className={modalClasses.input}
                    id="title"
                    name="title"
                  />
                  <br />
                  <label htmlFor="value">Valor: </label>
                  <br />
                  <NumberFormat
                    id="value"
                    name="value"
                    placeholder="Digite o valor da transação"
                    value={transactionInput.value}
                    thousandSeparator="."
                    prefix="R$"
                    decimalScale={2}
                    decimalSeparator=","
                    allowNegative={false}
                    fixedDecimalScale
                    isNumericString
                    displayType="input"
                    onValueChange={value => handleChangeValue(value.value)}
                    className={modalClasses.input}
                  />
                  <br />
                  <label htmlFor="category">Categoria:</label>
                  <br />
                  <input
                    placeholder="Digite o título da transação"
                    id="category"
                    name="category"
                    value={transactionInput.category}
                    onChange={e => handleChangeCategory(e.target.value)}
                    className={modalClasses.input}
                  />
                  <br />
                  <FormControl className={modalClasses.label}>
                    <InputLabel id="type-select-label">Tipo</InputLabel>
                    <Select
                      className={modalClasses.select}
                      labelId="type-select-label"
                      id="type-select"
                      value={transactionInput.type}
                      onChange={e => handleChangeType(e.target.value as string)}
                      displayEmpty
                    >
                      <MenuItem value="income">Entrada</MenuItem>
                      <MenuItem value="outcome">Saída</MenuItem>
                    </Select>
                    <FormHelperText>O tipo da sua transação</FormHelperText>
                  </FormControl>
                  <button type="submit" className={modalClasses.button}>
                    Adicionar
                  </button>
                </form>
              </div>
            </Fade>
          </Modal>
        </Buttons>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            {transactions &&
              transactions.map(transaction => (
                <tbody key={transaction.id}>
                  {transaction.type === 'income' ? (
                    <tr>
                      <td className="title">{transaction.title}</td>
                      <td className="income">
                        {formatValue(transaction.value)}
                      </td>
                      <td>{transaction.category.title}</td>
                      <td>{formatDate(transaction.created_at)}</td>
                      <td>
                        <AiFillDelete
                          size={20}
                          onClick={() => deleteTransaction(transaction.id)}
                        />
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="title">{transaction.title}</td>
                      <td className="outcome">
                        {`- ${formatValue(transaction.value)}`}
                      </td>
                      <td>{transaction.category.title}</td>
                      <td>{formatDate(transaction.created_at)}</td>
                      <td>
                        <AiFillDelete
                          size={20}
                          onClick={() => deleteTransaction(transaction.id)}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
