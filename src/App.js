import { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";

const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState([]);
  const [value, setValue] = useState(0);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setExperience(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="title">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  const { title, dates, duties, company } = experience[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {experience.map((job, index) => (
            <button
              key={job.id}
              onClick={() => setValue(index)}
              className={`job-btn ${index === value && "active-btn"}`}
            >
              {job.company}
            </button>
          ))}
        </div>
        <div className="job-info">
          <h3>{title} </h3>
          <h4>{company} </h4>
          <p className="job-date">{dates} </p>
          {duties.map((duty, index) => (
            <div className="job-desc" key={index}>
              <FaAngleDoubleRight className="job-icon" />
              <p>{duty}</p>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="btn">
        More Info
      </button>
    </section>
  );
}

export default App;
