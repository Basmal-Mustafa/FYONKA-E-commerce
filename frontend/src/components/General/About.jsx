import React from "react"
import "@/styles/About.css"

function About() {
  return (
    <div>
      <div className="fyonka-container">
        <div><img src="src\assets\about.webp" /></div>
        <div className="about-container">
          <h2>FYONKA - The City of Gifting</h2>
          <p>
            Once upon a time there was a land in a faraway place where people used to wander lost, with no clue as to what to do to pass the time…
          </p>
          <p>
            Sick and tired of this melancholy life they sought the help of the liveliest and wisest guy in town.
          </p>
          <p>
            This young man, known for his wild imagination, immediately set a plan in motion.
          </p>
          <p>
            He went knocking on every door of his little town, collecting names of the people who lived there and making note of the things they liked. He assigned them each a name and a task, to write a card and prepare a box that would change the other’s life!
          </p>
          <p>
            Everyone was suspicious at first, but he had promised them that a week from now he would reveal how it was a key to unlocking happiness and bringing back meaning to their life.
          </p>
          <p>
            Announcement night came and now everyone was gathered in front of this wise man’s home. Murmurs could be heard. The man then asked them to start calling out the names they have been assigned and exchange the gifts they have prepared.
          </p>
          <p>
            The crowd was definitely wowed! They haven’t had this much fun in a while. And so they have decided to make it a routine of creating boxes of endless possibilities and dreams. They called themselves giftopiians and appointed the young man as their Gift Guru; together they built this dreamland that you know now as giftopiia!
          </p>
        </div>
      </div>
      <div className="our-container">
        <div className="block">
          <h2>OUR MISSION</h2>
          <p>
            From start to finish, our clients are completely stress-free knowing their gifting is not merely beautiful, but also safely off their shoulders and on to ours.
          </p>
        </div>
        <div className="block">
          <h2>OUR VISION</h2>
          <p>
            To give you, the giver, the same amazing experience <br /> as the one unboxing the gift.
          </p>
        </div>
      </div>
      <div className="about-img">
        <div className="left-img">
          <img src="src/assets/right-about-image.webp" alt="Right About" />
        </div>
        <div className="right-imgs">
          <img className="right-img1" src="src/assets/left-top-about-image.webp" alt="Left Top About" />
          <img className="right-img2" src="src/assets/right-about-img.jpg" alt="Right About Small" />
        </div>
      </div>
    </div>
  )
}

export default About;
