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

  postExpense = async (data) => {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8080/api/expense";

    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const res = await axios.post(url, data, { headers });
      return res.data;
    } catch (err) {
      console.error("error while post data");
    }
  };
}

export default new ExpenseApi();
