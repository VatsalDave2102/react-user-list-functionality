import { Card, Image, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./UserCard.css";

const UserCard = () => {
  const cardData = useSelector((state) => state.users.userCard);
   
  return (
    <Card
      style={{width:'17rem'}}
      className={"justify-content-center align-items-center ms-md-5 mt-4 mt-md-0 transition show"}
    >
      {/* Image */}
      <Image src={cardData.img} className="card-img mt-3" roundedCircle />

      {/* User data */}
      <Card.Body className="w-100 d-flex flex-column align-items-center">
        {/* Name */}
        <Card.Title className="text-center name mx-auto">
          {cardData.name}
        </Card.Title>

        {/* Mail */}
        <p className="card-email text-center mx-auto">{cardData.email}</p>

        {/* Plan */}
        <h5 className="mx-auto text-center">
          <strong>Your Plan: Standard</strong>
        </h5>
        <div className="activity-status text-center p-2 w-75">
          <h5 className="m-auto">
            <strong>Active User</strong>
          </h5>
        </div>

        {/* Progress bar */}
        <div className="progress-bar w-100 mt-4 px-3">
          <p className="text-start m-0">
            <strong> Plan Uses</strong>
          </p>
          <ProgressBar variant="warning" now={Number(cardData.progress)} />
        </div>

        {/* Insights */}
        <div className="insights d-flex justify-content-evenly w-100 p-3 mt-3">
          <div className="clicks-review">
            <h3 className="m-0">{cardData.clicksReviewed}</h3>
            <p className="m-0">Clicks reviewed</p>
          </div>
          <div className="vr" />
          <div className="monthly-clicks">
            <h3 className="m-0">{cardData.monthlyClicks}</h3>
            <p className="m-0">Monthly clicks</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
