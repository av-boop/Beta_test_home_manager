import { useEffect, useState } from "react";
import { allTaskDueToday, getAllHouseholdMember } from "../../api/api";
import TaskCard from "./TaskCard";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTasks() {
      try {
        const taskData = await allTaskDueToday(abortController.signal);
          const memberData = await getAllHouseholdMember(abortController.signal);
        //   const updatedTaskData = taskData.filter(
        //       (task) => {
        //           console.log(task);
        //           console.log(new Date().toDateString());
        //           return new Date(task.due_date).toDateString() === new Date().toDateString()
        //       });
        //   console.log(updatedTaskData);
        setTasks(taskData);
        setMembers(memberData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        }
      }
    }
    loadTasks();
    return () => abortController.abort();
  }, []);
    return (
        tasks.map((task, key) => {
            task.assignedTo = members.find((member) => task.assignee === member.id);
          return <TaskCard task={task} key={key} />;
      })
  );
}

export default Home;
