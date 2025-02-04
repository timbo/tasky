import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Divider, Typography } from '@mui/material';

const Home = () => { 
    return(         
    <div className="App">
      <header className="App-header">
      <Typography variant="h1" gutterBottom>
        Tasky
      </Typography>
      </header>
      <section style={{padding: "0 0 25px 0" }}>
        <TaskForm />
      </section>
      <Divider />
      <section style={{padding: "25px 0 0 0"}}>
        <TaskList />
      </section>
    </div>
    )
} 

export default Home;