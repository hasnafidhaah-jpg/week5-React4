import { useState } from "react";

function Task() {
  // 1. DATA - Activity list
  const [activities, setActivities] = useState([
    { id: 1, title: "Morning Walk", category: "Health" },
    { id: 2, title: "React Practice", category: "Study" },
    { id: 3, title: "Watch Movie", category: "Fun" },
    { id: 4, title: "Read Book", category: "Study" },
  ]);

  // 2. STATE - Filter + Form
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Health");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 3. FILTER LOGIC - List filter 
  const filtered = activities.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  // 4. ADD FORM LOGIC
  function handleSubmit(e) {
    e.preventDefault(); // Page reload thadayan

    // VALIDATION - Empty aano?
    if (title.trim() === "") {
      setError("Title is required - Please type activity name");
      setSuccess("");
      return;
    }

    // new activity 
    const newActivity = {
      id: Date.now(), // Unique ID
      title: title.trim(),
      category: category,
    };

    setActivities([...activities, newActivity]);

    // CLEAR FORM - Reset
    setTitle("");
    setCategory("Health");
    setError("");
    setSuccess(` "${newActivity.title}" added successfully!`);
    setFilter("All"); 
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Day 4 - My Activities</h2>

      {/* FILTER BUTTONS */}
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Health")}>Health</button>
        <button onClick={() => setFilter("Study")}>Study</button>
        <button onClick={() => setFilter("Fun")}>Fun</button>
      </div>
      <p>Showing: {filter} ({filtered.length} items)</p>

      {/* LIST - Render */}
      {filtered.length === 0 ? (
        // EMPTY STATE
        <div style={{ background: "#f0f0f0", padding: "20px", textAlign: "center" }}>
          <p>No activities found</p>
          <p>Try another filter or add new activity below</p>
        </div>
      ) : (
        filtered.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}>
            <b>{item.title}</b> - {item.category}
          </div>
        ))
      )}

      <hr />

      {/* ADD FORM */}
      <h3>Add New Activity</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">Title *</label><br />
          <input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(""); // Type cheyyumbol error pokum
              setSuccess("");
            }}
            placeholder="e.g. Evening Yoga"
            style={{ padding: "8px", width: "100%" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="category">Category</label><br />
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          >
            <option>Health</option>
            <option>Study</option>
            <option>Fun</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "10px", padding: "8px 20px" }}>
          Add Activity
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Task;