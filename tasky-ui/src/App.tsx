import "./App.css";
import TasksProvider from "./providers/TasksProvider"; // Adjust the import path as necessary
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Divider, Typography } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Container maxWidth="sm">
      <TasksProvider>
        <CssBaseline>
          <div className="App">
            <header className="App-header" >
              <Typography variant="h3" component="h1" gutterBottom>
                Tasky:
              </Typography>
              <Typography variant="subtitle1" component="p" gutterBottom>
                A Simple Task Manager
              </Typography>
            </header>
            <Divider />
            <section style={{ padding: "0 0 25px 0" }}>
              <TaskForm />
            </section>
            <Divider />
            <section style={{ padding: "25px 0 0 0" }}>
              <TaskList />
            </section>
          </div>
        </CssBaseline>
      </TasksProvider>
    </Container>
  );
}

export default App;
