import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillDelete,
  AiFillFileExcel,
  AiFillPlusCircle,
} from 'react-icons/ai';
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
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

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
          <button type="button">
            <AiFillPlusCircle size={20} />
          </button>
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
/**
 * {transaction.type === 'income' ? (
                    <tr>
                      <td className="title">{transaction.title}</td>
                      <td className="income">
                        {formatValue(transaction.value)}
                      </td>
                      <td>{transaction.category}</td>
                      <td>20/04/1999</td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="title">{transaction.title}</td>
                      <td className="outcome">
                        {`- ${formatValue(transaction.value)}`}
                      </td>
                      <td>{transaction.category}</td>
                      <td>20/04/1999</td>
                    </tr>
                  )}
 */

export default Dashboard;
