import React from "react";
import { MDBCol, MDBRow } from "mdbreact";

const Items = ({
  itemsId,
  data: { name, description, delivery_time, price, furniture_style }
}) => (
  <div className="card">
    <div className="card-body">
      <MDBRow>
        <MDBCol sm="6">
          <h5 className="card-title">{name}</h5>
        </MDBCol>
        <MDBCol sm="6">
          <div className="price">{formatter.format(price)}</div>
        </MDBCol>
      </MDBRow>
      <div className="card-text">
        <div className="desc-items">{description}</div>
        <div className="funiture-style">
          {furniture_style.map((styles, index) => (
            <div key={index}>{styles}, </div>
          ))}
        </div>
        <div className="delivery-days">
          <a href="!#">Delivery Days : {delivery_time}</a>
        </div>
      </div>
    </div>
  </div>
);

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "IDR"
});

export default Items;
