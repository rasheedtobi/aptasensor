import React from 'react';

function Home() {
  return (
    <div>
      {/* Section for the showcase */}
      <section className="bg-dark p-5 text-light text-center text-sm-start mb-3">
        <div className="container">
          <div className="d-sm-flex">
            <div>
              <h1>
                Build and Design 
                <span className="text-info">Aptamer-based </span>
                Biosensor
              </h1>
              <p className="lead my-4">
                By Participating, You'll Learn the Fundamentals of Aptamer Design,
                Explore Advanced Immobilization Techniques, Select Optimal
                Transducers, and Perfect Signal Analysis, All While Gaining the
                Skills to Revolutionize Diagnostics and Research
              </p>
              <a href="#enroll" className="btn btn-primary btn-lg mt-3">
                Enroll Now
              </a>
            </div>
            <img className="img-fluid w-50 d-none d-lg-block" src="img/biotech.jpg" alt="" />
          </div>
        </div>
      </section>

   <section className="my-3">
      <div className="container my-3">
        <div id="demo" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner" style={{ height: '400px' }}>
            <div className="carousel-item active">
              <img src="img/graphene.jpeg" alt="Los Angeles" className="d-block" style={{ width: '100%' }} />
            </div>
            <div className="carousel-item">
              <img src="img/dna.jpeg" alt="Chicago" className="d-block" style={{ width: '100%' }} />
            </div>
            <div className="carousel-item">
              <img src="img/AUNps.jpg" alt="New York" className="d-block" style={{ width: '100%' }} />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>    

     <section className="bg-warning p-5 my-3">
      <div className="container">
        <div className="d-md-flex justify-content-between align-items-center">
          <h3 className="mb-3 mb-md-0">Sign up for Newsletters</h3>
          <div className="input-group form-outline w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="Recipient's Email"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-primary" type="button">Submit</button>
          </div>
        </div>
      </div>
    </section>
      

    <section className="m-5" id="enroll">
      <div className="container">
        <div className="row text-center justify-content-center align-items-center g-4">
          <div className="col-md">
            <div className="card bg-dark text-light">
              <div className="card-body text-center">
                <div className="h1 mb-3">
                  <i className="bi bi-layers-half"></i>
                </div>
                <h4 className="card-title">Part-Time</h4>
                <p className="lead text-muted card-subtitle">6 months</p>
                <p className="card-text text-muted">
                  Embark on a flexible learning journey that allows you to balance your professional commitments with in-depth education. Over six 
                </p>
                <a href="#" className="btn btn-primary btn-lg mt-3">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="card bg-dark text-light">
              <div className="card-body text-center">
                <div className="h1 mb-3">
                  <i className="bi bi-lightning"></i>
                </div>
                <h4 className="card-title">Accelerated</h4>
                <p className="lead text-muted card-subtitle">2 months</p>
                <p className="card-text text-muted">
                 Ready for an intense and immersive experience? Our accelerated program condenses the curriculum into two action-packed months. It's ideal for those who thrive in high-paced environments, eager to absorb knowledge quickly, and put it into practice.
                </p>
                <a href="#" className="btn btn-warning btn-lg mt-3">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="card bg-dark text-light">
              <div className="card-body text-center">
                <div className="h1 mb-3">
                  <i className="bi bi-clock"></i>
                </div>
                <h4 className="card-title">Full-Time</h4>
                <p className="lead text-muted card-subtitle">4 months</p>
                <p className="card-text text-muted">
                  Immerse yourself in a full-time educational experience designed to equip you with comprehensive expertise in a shorter timeframe. .
                </p>
                <a href="#" className="btn btn-primary btn-lg mt-3">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="learn" className="p-5">
      <div className="container">
        <div className="row align-items-center justify-content-end">
          <div className="col-md">
            <img src="img/ddna.jpeg" className="img-fluid" alt="" />
          </div>
          <div className="col-md p-5">
            <h2>Learn The Building Blocks</h2>
            <div className="display-5 text-muted">
              DNA, RNA, Proteins, Amino Acids and Amptamers
            </div>
            <p>
              Dive into the fascinating world of molecular biology as we explore the foundational components of life. DNA, the genetic blueprint of all organisms, holds the key to our unique traits and hereditary information. RNA, the versatile messenger, plays a crucial role in conveying genetic instructions and catalyzing cellular processes.
            </p>
            <p>
              Proteins, the workhorses of biological systems, serve as the building blocks of tissues, enzymes, and molecular machines. Amino acids, the basic units of protein structure, are the architects of diversity in life's structures and functions.
            </p>
            <p>
              Venture into the innovative realm of Aptamers, where artificial molecules mimic the specificity of antibodies. Aptamers find applications in diagnostics, therapeutics, and beyond, shaping the future of biotechnology and medical advancements.
            </p>
            <p>
              Understanding these building blocks is essential for anyone passionate about life sciences and the boundless possibilities they offer. Join us on a journey to decode the secrets of life's molecular foundations.
            </p>
            <a href="#" className="btn btn-light mt-3">
              <i className="bi bi-chevron-right"></i> Read More
            </a>
          </div>
        </div>
      </div>
    </section>
    <section id="learn" className="p-5 bg-danger text-light">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md p-5">
            <h2>Learn Immobilization and Incubation</h2>
            <div className="display-5 text-warning">
              Analytes, Self-assembled Monolayers, Electrodes and Electrolytes
            </div>
            <p className="lead">
              Delve into the world of analytes, exploring their vital role in the field of biotechnology. Understand how analytes are the substances of interest, the molecules you're seeking to detect or measure in various applications.
            </p>
            <p>
              Discover the science behind self-assembled monolayers (SAMs), a critical aspect of surface chemistry. Learn how SAMs provide a stable platform for the immobilization of molecules, paving the way for efficient and specific detection.
            </p>
            <p>
              Explore the fascinating realm of electrodes and electrolytes, integral components in electrochemical biosensors. Gain insight into the interplay between electrodes and electrolytes, crucial for signal generation and analysis in various biosensing techniques.
            </p>
            <p>
              Master the art of immobilization and incubation as you navigate the intricate world of biotechnology. These techniques are essential for achieving reliable and precise results in diagnostics, research, and beyond.
            </p>
            <a href="#" className="btn btn-light mt-3">
              <i className="bi bi-chevron-right"></i> Read More
            </a>
          </div>
          <div className="col-md">
            <img src="img/AUNps.jpg" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Home;
