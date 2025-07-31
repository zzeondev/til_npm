import CounterAtom from "./components/CounterAtom";
import TodoList from "./components/TodoList";
import Header from "./components/layout/Header";
import JoinPage from "./pages/JoinPage";
import Schedule from "./pages/Schedule";
import Slide from "./pages/Slide";

function App() {
  return (
    <div>
      <CounterAtom />
      <TodoList />
    </div>
  );
}

export default App;
