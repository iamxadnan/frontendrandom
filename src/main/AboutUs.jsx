import React from 'react';
import './AboutUs.css';  // Ensure you create this CSS file for styling

export default function AboutUs() {
    const target = {
        clicked: 0,
        currentFollowers: 90,
        btn: document.querySelector("a.btn"),
        fw: document.querySelector("span.followers")
    };

    const follow = () => {
        target.clicked += 1;
        target.btn.innerHTML = 'Following <i className="fas fa-user-times"></i>';

        if (target.clicked % 2 === 0) {
            target.currentFollowers -= 1;
            target.btn.innerHTML = 'Follow <i className="fas fa-user-plus"></i>';
        }
        else {
            target.currentFollowers += 1;
        }

        target.fw.textContent = target.currentFollowers;
        target.btn.classList.toggle("following");
    }

    return (
        <div className="cards-container" style={{marginTop:"100px"}}>
          <h1>About US</h1>
            {/* Card 1 */}
            <div className="card" >
                <div className="ds-top"></div>
                <div className="avatar-holder">
                    <img src="./images/adnan.jpg" alt="Adnan Shariff"/>
                </div>
                <div className="name">
                    <a href="https://codepen.io/AlbertFeynman/" target="_blank" rel="noopener noreferrer">Adnan Shariff</a>
                    <h6 title="Followers"><i className="fas fa-users"></i> <span className="followers">Student at KL University</span></h6>
                </div>
                <div className="button">
                    <a href="https://www.linkedin.com/in/adnanshariff119/" className="btn" onMouseDown={follow}>LinkedIn <i className="fas fa-user-plus"></i></a>
                </div>
                <div className="ds-info">
                    <div className="ds pens">
                        <h6 title="Expereince">Experience <i className="fas fa-edit"></i></h6>
                        <p>Fresher</p>
                    </div>
                    <div className="ds projects">
                        <h6 title="Number of projects created by the user">Projects <i className="fas fa-project-diagram"></i></h6>
                        <p>4</p>
                    </div>
                    <div className="ds posts">
                        <h6 title="Number of posts">Posts <i className="fas fa-comments"></i></h6>
                        <p>6</p>
                    </div>
                </div>
                <div className="ds-skill">
                    <h6>Skill <i className="fa fa-code" aria-hidden="true"></i></h6>
                    <div className="skill html">
                        <h6><i className="fab fa-html5"></i> React </h6>
                        <div className="bar bar-html">
                            <p>95%</p>
                        </div>
                    </div>
                    <div className="skill css">
                        <h6><i className="fab fa-css3-alt"></i> CSS </h6>
                        <div className="bar bar-css">
                            <p>90%</p>
                        </div>
                    </div>
                    <div className="skill javascript">
                        <h6><i className="fab fa-js"></i> Java </h6>
                        <div className="bar bar-js">
                            <p>75%</p>
                        </div>
                    </div>
                    <div className="skill springboot">
                        <h6><i className="fab fa-js"></i> SpringBoot </h6>
                        <div className="bar bar-springboot">
                            <p>55%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2 (copy of Card 1, you can change content as needed) */}
            <div className="card" style={{marginLeft:"100px"}}>
                <div className="ds-top"></div>
                <div className="avatar-holder">
                    <img src="./images/kousalya.jpg" alt="Kousalya Chilukuri"/>
                </div>
                <div className="name">
                    <a href="https://codepen.io/AlbertFeynman/" target="_blank" rel="noopener noreferrer">Kousalya Chilukuri</a>
                    <h6 title="Followers"><i className="fas fa-users"></i> <span className="followers">Student at KL University</span></h6>
                </div>
                <div className="button">
                    <a href="https://www.linkedin.com/in/kousalya-chilukuri-b5354a24b" className="btn" onMouseDown={follow}>LinkedIn <i className="fas fa-user-plus"></i></a>
                </div>
                <div className="ds-info">
                    <div className="ds pens">
                        <h6 title="Expereince">Experience <i className="fas fa-edit"></i></h6>
                        <p>Fresher</p>
                    </div>
                    <div className="ds projects">
                        <h6 title="Number of projects created by the user">Projects <i className="fas fa-project-diagram"></i></h6>
                        <p>4</p>
                    </div>
                    <div className="ds posts">
                        <h6 title="Number of posts">Posts <i className="fas fa-comments"></i></h6>
                        <p>6</p>
                    </div>
                </div>
                <div className="ds-skill">
                    <h6>Skill <i className="fa fa-code" aria-hidden="true"></i></h6>
                    <div className="skill html">
                        <h6><i className="fab fa-html5"></i> React </h6>
                        <div className="bar bar-html">
                            <p>95%</p>
                        </div>
                    </div>
                    <div className="skill css">
                        <h6><i className="fab fa-css3-alt"></i> CSS </h6>
                        <div className="bar bar-css">
                            <p>90%</p>
                        </div>
                    </div>
                    <div className="skill javascript">
                        <h6><i className="fab fa-js"></i> Java </h6>
                        <div className="bar bar-js">
                            <p>75%</p>
                        </div>
                    </div>
                    <div className="skill springboot">
                        <h6><i className="fab fa-js"></i> SpringBoot </h6>
                        <div className="bar bar-springboot">
                            <p>55%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3 (copy of Card 1, you can change content as needed) */}
            <div className="card" style={{marginRight:"100px"}}>
                <div className="ds-top"></div>
                <div className="avatar-holder">
                    <img src="./images/somsekhar.jpg" alt="Som Sekhar"/>
                </div>
                <div className="name">
                    <a href="https://codepen.io/AlbertFeynman/" target="_blank" rel="noopener noreferrer">Som Sekhar</a>
                    <h6 title="Followers"><i className="fas fa-users"></i> <span className="followers">Student at KL University</span></h6>
                </div>
                <div className="button">
                    <a href="https://www.linkedin.com/in/bhaviri-somsekhar-a4483a264/" className="btn" onMouseDown={follow}>LinkedIn <i className="fas fa-user-plus"></i></a>
                </div>
                <div className="ds-info">
                    <div className="ds pens">
                        <h6 title="Expereince">Experience <i className="fas fa-edit"></i></h6>
                        <p>Fresher</p>
                    </div>
                    <div className="ds projects">
                        <h6 title="Number of projects created by the user">Projects <i className="fas fa-project-diagram"></i></h6>
                        <p>4</p>
                    </div>
                    <div className="ds posts">
                        <h6 title="Number of posts">Posts <i className="fas fa-comments"></i></h6>
                        <p>6</p>
                    </div>
                </div>
                <div className="ds-skill">
                    <h6>Skill <i className="fa fa-code" aria-hidden="true"></i></h6>
                    <div className="skill html">
                        <h6><i className="fab fa-html5"></i> React </h6>
                        <div className="bar bar-html">
                            <p>95%</p>
                        </div>
                    </div>
                    <div className="skill css">
                        <h6><i className="fab fa-css3-alt"></i> CSS </h6>
                        <div className="bar bar-css">
                            <p>90%</p>
                        </div>
                    </div>
                    <div className="skill javascript">
                        <h6><i className="fab fa-js"></i> Java </h6>
                        <div className="bar bar-js">
                            <p>75%</p>
                        </div>
                    </div>
                    <div className="skill springboot">
                        <h6><i className="fab fa-js"></i> SpringBoot </h6>
                        <div className="bar bar-springboot">
                            <p>55%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="large-circle">

</div>

         
</div>
    );
}
