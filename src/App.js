import { React, useState } from "react";
import "./css/reset.css";
import "./css/index.css";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import SortSection from "./components/SortSection";
import MainSection from "./components/MainSection";

const App = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Zakup telefonu",
      date: "5.11.2019",
      amount: "1200zł",
      img: "img",
      status: "Częsciowo zapłacone",
    },
    {
      id: 2,
      name: "Zakup samochodu",
      date: "15.12.2020",
      amount: "85000zł",
      img: "img",
      status: "Wszystkie",
    },
  ]);

  return (
    <main className="main-content">
      <Header />
      <FiltersSection />
      <SortSection />
      <MainSection expenses={expenses} />
    </main>
  );
};

export default App;
