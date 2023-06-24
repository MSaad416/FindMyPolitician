function About() {
  return (
    <>
      <nav className="navbar bg-secondary border-bottom border-bottom-dark " data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            FindMyPolitician
          </a>
          <a className="remove-link" href="/about">
            About
          </a>
        </div>
      </nav>

      <div className="container-fluid mt-5">
        <div className="container-md">
          <p className="lead text-center">
            This website was created to assist individuals in easily finding out information about thier political
            representatives. API endpoints provided by OPEN NORTH are utilized to retrieve up to date information. <br></br>
            For any known bugs: leave an issue on the project's Github repo.
          </p>
        </div>
      </div>
    </>
  );
}
export default About;
