import data from "../data.json";

function ProfileCard({ props }) {
  return (
    <>
      <div className="col">
        <img src={props.photo_url} alt="pictures" />
        <div>{` Name: ${props.name}`}</div>
        <div>{` Political Party: ${props.party_name}`}</div>
        <div>{` Office: MP - Member of Parliament`}</div>
        <div>{` Contact: ${props.offices[0].tel}`}</div>
        <div>{` Email: ${props.email}`}</div>
      </div>
    </>
  );
}

function MainData() {
  return (
    <>
      <div className="">
        <div className="container text-center pt-4">
          <div className="row">
            <div className="col">
              <ProfileCard props={data.objects[15]} />
            </div>
            <div className="col">
              <ProfileCard props={data.objects[16]} />
              {/* <body>{` Name: ${data.objects[13].name}`}</body> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainData;
