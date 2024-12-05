function TaskCard({ task, member,key }) {
  const {
    title,
    description,
    recurring,
    completed,
    due_date,
    importance,
    assignedTo,
  } = task;
  const date = new Date(due_date);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div class="card w-75 mt-5" key={key}>
      <div class="card-header">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <b>Task: {title}</b>
            </div>
            <div className="col-md-4">
              <b className="text-light bg-primary p-1 rounded ">
                Recurring : {recurring}
              </b>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <b className="text-dark bg-warning p-1 rounded ">
                Due Date: {formattedDate}
              </b>
            </div>
            <div className="col-md-4">
              <b className="text-light bg-danger p-1 rounded ">
                Importance: {importance}
              </b>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-8">
              <b>Description:</b> {description}
            </div>
            <div className="col-md-4">
              <b>Assigned to:</b> {assignedTo?assignedTo.member_name:"Not assigned yet."}
            </div>
          </div>
        </div>
      </div>
      {completed ? (
        <div className="card-footer bg-secondary text-light">
          <div className="row">
            <div className="col text-center">
              <b className="text-light">Completed: </b> Yes
            </div>
          </div>
        </div>
      ) : (
        <div className="card-footer bg-secondary text-light">
          <div className="row">
            <div className="col text-center">
              <b className="text-light">Completed: </b> No
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;