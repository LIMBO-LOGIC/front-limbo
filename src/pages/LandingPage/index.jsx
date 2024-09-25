import React, { useState, useEffect } from "react";
import styles from "./landingPage.module.css";
import carro1 from "../../assets/carro1.png";
import carro2 from "../../assets/carro2.png";
import carro3 from "../../assets/carro3.png";
import NavMobile from "./NavMenuLandingPage";
import Footer from "../../components/Footer";

const images = [carro1, carro2, carro3];

export default function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavMobile className={styles.navbar}></NavMobile>

      <div className={styles.slideshow}>
        <img
          src={images[currentImage]}
          alt="Slide"
          className={styles.slideImage}
        />
        <h1 className={styles.title}>
          Formula E <br />
          <span className={styles.livehub}>Live Hub</span>
          <a href="#styles.textContainer" className={styles.arrowDown}>
            ↓
          </a>
        </h1>
      </div>
      {/* Seção "Welcome to the Future of Racing" */}
      <section id="section1" className={styles.futureSection}>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <h2>Welcome to the Future of Racing: Formula E</h2>
            <p>
              <strong>Experience the Thrill of Electric Racing</strong>
            </p>
            <p>
              Welcome to Formula E, the groundbreaking motorsport that's
              redefining the world of racing. Here, electric vehicles take
              center stage, showcasing the incredible potential of clean energy
              while delivering heart-pounding excitement on the track. Formula E
              is not just a race; it's a movement towards a more sustainable and
              electrifying future.
            </p>
            <p>
              <strong>Why Formula E?</strong>
            </p>
            <p>
              Cutting-Edge Technology: Witness the latest in electric vehicle
              innovation as teams compete with state-of-the-art cars, pushing
              the boundaries of speed and efficiency.
            </p>
            <p className={styles.subtitle}>
              <strong>Join the Revolution</strong>
            </p>
            <p>
              Be part of the excitement and witness the evolution of motorsport
              firsthand. Whether you're a die-hard racing fan or new to the
              world of electric vehicles, Formula E offers a unique and
              exhilarating experience for everyone. Explore our latest races,
              follow your favorite teams, and dive into the innovation that's
              driving the future of racing.
            </p>
          </div>
        </div>
      </section>
      <section id="ecosystemSection" className={styles.ecosystemSection}>
        <h2>Discover the Power of Ecosystems</h2>
        <p>
          An ecosystem is a dynamic and interconnected network where living
          organisms interact with each other and their physical environment.
          From lush forests and vibrant coral reefs to urban green spaces,
          ecosystems provide essential services like clean air, water, and
          fertile soil. They support biodiversity, regulate climate, and offer
          resilience against natural disasters. Embrace the beauty and
          complexity of ecosystems and join the effort to protect and sustain
          these vital systems for a healthier planet.
        </p>
      </section>
      <Footer/>
    </>
  );
}
