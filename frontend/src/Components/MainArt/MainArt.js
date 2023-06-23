function MainArt() {
  return (
    <>
      <div className="">
        <div className="container-fluid pt-4" style={{ maxWidth: "900px" }}>
          <div className="text-center">
            <div className="position-relative">
              <div className="on-hov">
                <img
                  src={require("../App/politics.png")}
                  className="img-fluid mx-auto d-block"
                  alt="..."
                  style={{ borderRadius: "4%", opacity: 1 }}
                />
                <div className="overlay">
                  <h2>
                    {" "}
                    Know who represents the will of the people in your region! <br></br>{" "}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainArt;
