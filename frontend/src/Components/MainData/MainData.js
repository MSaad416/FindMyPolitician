import "./MainData.css";

function ProfileCard({ props, office }) {
  const data = props.objects.find((obj) => obj.elected_office === office);

  return (
    <>
      {data === undefined && (
        <>
          <div className="text-center overlay3">
            <div className="alert alert-danger overlay4">Check that the postal code entered is correct</div>
          </div>
        </>
      )}
      {data !== undefined && data.photo_url !== undefined && data.name !== undefined && data.party_name !== undefined && (
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
      )}
    </>
  );
}

function MainData({ data, loading }) {
  return (
    <>
      <div className="">
        <div className="list-group-item d-flex justify-content-center align-items-center flex-wrap pt-5">
          <div className="card-group">
            {console.log(`Loading; `, loading)}
            {console.log(data)}

            {loading === false && data !== undefined && (
              <div className="row gx-5">
                <div className="col pt-1">
                  <ProfileCard props={data} office={"MP"} />
                </div>
                <div className="col pt-1">
                  <ProfileCard props={data} office={"MPP"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainData;
