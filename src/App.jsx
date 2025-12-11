import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: Date.now(),
      task,
      priority,
      deadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setPriority("top");
    setDeadline("");
  };

  const markDone = (id) => {
    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, { ...completedTask, done: true }]);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "top":
        return "bg-red-500/20 text-red-300 border border-red-500/30";
      case "middle":
        return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "top":
        return "High";
      case "middle":
        return "Medium";
      case "low":
        return "Low";
      default:
        return priority;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 tracking-tight">
            Task Manager
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Organize your work, simplify your life</p>
        </div>

        {/* Task Input Form */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <input
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={handleTaskChange}
              className="col-span-1 sm:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm backdrop-blur-sm"
            />
            <select
              value={priority}
              onChange={handlePriorityChange}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm backdrop-blur-sm"
            >
              <option value="top" className="bg-slate-900">High Priority</option>
              <option value="middle" className="bg-slate-900">Medium Priority</option>
              <option value="low" className="bg-slate-900">Low Priority</option>
            </select>
            <input
              type="date"
              value={deadline}
              onChange={handleDeadlineChange}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm backdrop-blur-sm [color-scheme:dark]"
            />
          </div>
          <button
            onClick={addTask}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-[0.98] text-sm"
          >
            Add Task
          </button>
        </div>

        {/* Upcoming Tasks */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-3">
            <span className="w-1 h-7 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
            Upcoming Tasks
            <span className="text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {tasks.length}
            </span>
          </h2>
          
          {tasks.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl p-12 text-center border border-white/10">
              <div className="text-gray-600 mb-2">
                <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">No tasks yet</p>
              <p className="text-gray-600 text-sm mt-1">Add one to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white mb-3 break-words text-lg">{t.task}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className={`px-3 py-1.5 rounded-lg font-medium text-xs backdrop-blur-sm ${getPriorityColor(t.priority)}`}>
                          {getPriorityLabel(t.priority)}
                        </span>
                        <span className="text-gray-400 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(t.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => markDone(t.id)}
                      className="bg-emerald-600/80 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap active:scale-95 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 border border-emerald-500/30"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-3">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
              Completed
              <span className="text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {completedTasks.length}
              </span>
            </h2>
            <div className="space-y-3">
              {completedTasks.map((ct) => (
                <div
                  key={ct.id}
                  className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-xl p-5 border border-white/10 opacity-60 hover:opacity-80 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-400 mb-3 line-through break-words text-lg">{ct.task}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className={`px-3 py-1.5 rounded-lg font-medium text-xs backdrop-blur-sm ${getPriorityColor(ct.priority)}`}>
                          {getPriorityLabel(ct.priority)}
                        </span>
                        <span className="text-gray-500 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(ct.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;