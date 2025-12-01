import React, { useState } from "react";
import { api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setInteractions } from "./store";

function App() {
  const [hcpId, setHcpId] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const interactions = useSelector((s) => s.interaction.interactions);

  const logInteraction = async () => {
    await api.post("/agent", {
      task: "log",
      data: {
        hcp_id: hcpId,
        summary: text,
        interaction_type: "field_visit"
      }
    });
    alert("Interaction Logged!");
  };

  const history = async () => {
    const res = await api.post("/agent", {
      task: "history",
      data: { hcp_id: hcpId }
    });
    dispatch(setInteractions(res.data));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Log Interaction Screen</h1>

      <input
        placeholder="Enter HCP ID"
        value={hcpId}
        onChange={(e) => setHcpId(e.target.value)}
      />

      <textarea
        placeholder="Write interaction or chat…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={logInteraction}>Log Interaction</button>
      <button onClick={history}>Fetch History</button>

      <h2>Past Interactions</h2>
      {interactions.map((item, index) => (
        <p key={index}>{JSON.stringify(item)}</p>
      ))}
    </div>
  );
}

export default App;
