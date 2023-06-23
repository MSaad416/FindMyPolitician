// import data from "../../data.json";
import { useEffect } from "react";
import "./MainData.css";
// import data from "../../data2.json";

function ProfileCard({ props, office }) {
  // console.log("pre-res");
  // console.log(props.objects);
  const data = props.objects.find((obj) => obj.elected_office === office);
  // console.log("post-res");
  // console.log(data);

  // console.log(x);

  return (
    <>
      <div className="card">
        <div className="card-block">
          <img className="img-contain" src={data.photo_url} alt="pictures" />

          <div className="card-body">
            <h5 className="bold-text">{`${data.name}`}</h5>
            <p className="">{` Political Party: ${data.party_name}`}</p>
            <p>{` Office: ${data.elected_office}`}</p>
            <p>{` Contact: ${data.offices[0].tel}`}</p>
            <p>{` Email: ${data.email}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function MainData({ data, loading }) {
  return (
    <>
      <div className="">
        <div className="list-group-item d-flex justify-content-center align-items-center flex-wrap pt-5">
          {/* <div className="container-c">
            <div className="card-wrap">
              <ProfileCard props={data.objects[15]} />
            </div>
            <div className="card-wrap">
              <ProfileCard props={data.objects[16]} />
            </div>{" "}
          </div> */}

          <div className="card-group">
            {console.log(`Loading; `, loading)}
            {console.log(data)}
            {loading === false && data !== undefined && (
              <div className="row gx-5">
                <div className="col p-4">
                  <ProfileCard props={data} office={"MP"} />
                </div>
                <div className="col p-4">
                  <ProfileCard props={data} office={"MPP"} />
                </div>
              </div>
            )}
          </div>

          {/* {console.log(`Props: ${props}`)} */}
        </div>
      </div>
    </>
  );
}
export default MainData;
