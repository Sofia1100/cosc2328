// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

function TaskCard(props) {
    return (
        <div className={"task-card " + props.task.priority.toLowerCase()}>
            <div className="task-info">
                <span className="task-name">{props.task.name}</span>
                <span className={"badge " + props.task.priority.toLowerCase()}>
                    {props.task.priority}
                </span>
            </div>
            <button className="delete-btn"
                aria-label={"Delete " + props.task.name}
                onClick={() => props.onDelete(props.task.id)}>
                X
            </button>
        </div>
    );
};


function TaskList(props) {
    if (props.tasks.length === 0) {
        return (
            <p className="empty-state">No tasks yet, add one above</p>
        );
    }
    return (
        <div className="task-list">
            {props.tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={props.onDelete} />
            ))}
        </div>
    );
}




function App() {
    const [tasks, setTasks] = React.useState([]);
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [error, setError] = React.useState('');

    function addTask() {
        if (taskName.trim() === "") {
            setError('Task name cannot be empty');
            return;
        }
        setError('');

        const newTask = { id: Date.now(), name: taskName.trim(), priority };
        setTasks([...tasks, newTask]);
        setTaskName('');
        setPriority('Medium');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function clearAll(){
        setTasks([]);
    }

    return (
        <div className="app-container">
            <div className="app-header">
                <h1>Quick Tasks</h1>
                <span className="task-count">
                    {`${tasks.length} task${tasks.length === 1 ? '' : 's'}`}
                </span>
            </div>
            <div className="form-area">
                <input
                    type="text"
                    placeholder="What needs doing?"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)} />
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button className="add-btn" onClick={addTask}>Add Task</button>
                {error && <p className="error-message">{error}</p>}
            </div>
            <TaskList tasks={tasks} onDelete={deleteTask} />

            {tasks.length > 0 && (<button className="clear-btn" onClick={clearAll}>Clear All</button>)}


        </div>
    );

}


// --- Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);