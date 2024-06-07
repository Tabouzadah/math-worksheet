import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const HighScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const scoresList = querySnapshot.docs.map(doc => doc.data());
      setScores(scoresList);
    };

    fetchScores();
  }, []);

  return (
    <div>
      <h1>Top 5 Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score.name}: {score.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default HighScores;
