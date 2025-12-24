import React from "react";
import MetaData from "../MetaData.js";
import "./About.css";

const About = () => (
  <>
    <MetaData title="About — SHOPSIMP" />
    <section className="aboutBanner">
      <div className="aboutContent">
        <h1>About SHOPSIMP</h1>
        <p>
          SHOPSIMP is a lightweight e‑commerce frontend demo built with React,
          Redux and Material UI. It showcases product listing, filters,
          pagination and a responsive banner — designed to be extended with
          AI tools and custom backends.
        </p>

        <ul className="aboutList">
          <li>Responsive product catalog with filters</li>
          <li>Image upload + user authentication (backend ready)</li>
          <li>Extensible components for reviews, ratings and payments</li>
        </ul>

        {/* contact link removed */}
      </div>

      <div className="aboutImage" aria-hidden="true" />
    </section>

    <section className="aboutTeam">
      <h2>Why SHOPSIMP?</h2>
      <p>
        Focused on simplicity and modularity — small components, clear state
        management, and responsive CSS units (vmax/vmin) so the UI holds up
        on many screen sizes.
      </p>
    </section>
  </>
);

export default About;