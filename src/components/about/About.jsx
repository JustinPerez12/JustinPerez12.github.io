import Portrait from '../../Assets/professional_photo3.png'
import './About.css'

const About = () => (
  <section id="about" className="section">
    <div className="container about">
      <div className="about__content">
        <p className="section__label">About</p>
        <h2 className="section__title">A bit of background</h2>

        <div className="about__prose">
          <p>
            I found computer science in my first class at the University of Utah in 2019. I&apos;d
            enrolled as a computer engineering major and switched within the year — it was pretty
            clear pretty fast which one I actually wanted to do.
          </p>
          <p>
            I started at Cox Automotive on the Product Security Engineering team, where I spent two
            years building the tooling that told thousands of software components whether they were
            safe to ship. That work is where I got comfortable with the parts of engineering people
            tend to skip: graph data modeling, ETL that has to be right, and vendor integrations
            that break in ways the docs never mention.
          </p>
          <p>
            Now I&apos;m a Software Engineer 2 at NICE, working on federated knowledge retrieval and
            pulling expensive work off user-facing request paths and onto event-driven services. A
            lot of the job is quieter than that: chasing a collation mismatch across 600 databases,
            or closing an access-control hole without breaking login.
          </p>
          <p>
            Outside of work I build things I want to exist — <a href="#work">Dynasty Futures</a>, a
            production trading platform I own end to end, and <a href="#work">Campus Core</a>, an
            education platform we&apos;re taking to market. Both taught me the same lesson: the hard
            part usually isn&apos;t the code, it&apos;s the state.
          </p>
        </div>
      </div>

      <div className="about__aside">
        <div className="about__portrait">
          <img
            src={Portrait}
            alt="Justin Perez"
            width="480"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
)

export default About
