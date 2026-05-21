import React from 'react';

function AboutUs() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Paradise Nursery</h1>
      <p style={styles.text}>
        Welcome to <strong>Paradise Nursery</strong> — your one-stop destination for beautiful,
        healthy houseplants. Founded in 2020, we are passionate about bringing nature indoors
        and helping people create green, vibrant living spaces.
      </p>
      <p style={styles.text}>
        Our carefully curated collection includes air-purifying plants, flowering beauties,
        rare succulents, and lush tropical varieties — all sourced from trusted growers
        who share our commitment to quality and sustainability.
      </p>
      <p style={styles.text}>
        At Paradise Nursery, we believe every home deserves a touch of nature.
        Whether you're a seasoned plant parent or just starting your green journey,
        we have the perfect plant for you.
      </p>
      <h2 style={styles.subheading}>Our Mission</h2>
      <p style={styles.text}>
        To make plant ownership accessible, enjoyable, and rewarding for everyone —
        one plant at a time.
      </p>
      <h2 style={styles.subheading}>Contact Us</h2>
      <p style={styles.text}>Email: hello@paradisenursery.com</p>
      <p style={styles.text}>Phone: +1 (800) 555-PLANT</p>
      <p style={styles.text}>Address: 123 Green Lane, Botanical City, CA 90210</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Georgia, serif',
    color: '#2d4a1e',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#1a3a0f',
  },
  subheading: {
    fontSize: '1.5rem',
    marginTop: '30px',
    marginBottom: '10px',
    color: '#2d6a1e',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '15px',
  },
};

export default AboutUs;
