import { useEffect } from "react";
import Router from "@/router";
import { TestWeb } from "./service/test";

function App() {
  useEffect(() => {
    TestWeb();
  }, []);
  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
