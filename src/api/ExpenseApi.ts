import axios from "axios";
import { Expense } from "../types/Expense";

class ExpenseApi {
  // rootUrl = "https://expenses-app-lite-api.herokuapp.com/";
  rootUrl = "http://localhost:8080/";

  getExpenses = async () => {
    const token = sessionStorage.getItem("token");
    const url = `${this.rootUrl}api/expense`;

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.get(url, { headers });
      return res.data;
    } catch (err) {
      console.error("error while fetching data");
    }
  };

  postExpense = async (expense: Expense) => {
    const token = sessionStorage.getItem("token");
    const url = `${this.rootUrl}api/expense`;
    let id: string = "";

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.post(url, expense, { headers });
      id = res.data;
      return id;
    } catch (err) {
      console.error("error while posting data");
      return id;
    }
  };

  delExpense = async (id: string | undefined) => {
    const token = sessionStorage.getItem("token");
    const url = `${this.rootUrl}api/expense?id=${id}`;

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.delete(url, { headers });
      return res.data;
    } catch (err) {
      console.error("error while deleting data");
    }
  };

  editExpense = async (id: string | undefined, expense: Expense) => {
    if (!id) return;
    const token = sessionStorage.getItem("token");
    const url = `${this.rootUrl}api/expense?id=${id}`;

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.put(url, expense, { headers });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error("error while editing data");
    }
  };
}

export default new ExpenseApi();
