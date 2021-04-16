import axios from "axios";

class ExpenseApi {
  getExpenses = async () => {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8080/api/expense";

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.get(url, { headers });
      return res.data;
    } catch (err) {
      console.error("error while fetch data");
    }
  };

  postExpense = async (expense) => {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8080/api/expense";

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.post(url, expense, { headers });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error("error while post data");
    }
  };

  delExpense = async (id) => {
    const token = sessionStorage.getItem("token");
    const url = `http://localhost:8080/api/expense/${id}`;

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.delete(url, { headers });
      return res.data;
    } catch (err) {
      console.error("error while delete data");
    }
  };

  editExpense = async (id, expense) => {
    if (!id) return;
    const token = sessionStorage.getItem("token");
    const url = `http://localhost:8080/api/expense/${id}`;

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.put(url, expense, { headers });
      return res.data;
    } catch (err) {
      console.error("error while editing data");
    }
  };
}

export default new ExpenseApi();
