// import React from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import DynamicForm from "../components/Forms/dynamicForm";

// const SignupSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
// });

// const SendOrders = () => {
//   const orderDetailsFields = [
//     { label:"Category", value:"category", type: "text"},
//     { label:"Product Name", value:"productName", type: "text"},
//     { label:"Product Size",value:"productSize",  type: "text"},
//     { label:"Product Description",value:"productDescription",  type: "text"},
//     { label:"Expected Delivery Date",value:"exptDeliveryDate",  type: "text"},
//   ];

//   const receiverDetailsFields = [
//     { label:"Receiver Name",value:"receiverName",  type: "text"},
//     { label:"Receiver Address",value:"receiverAddress",  type: "text"},
//     { label:"Phone Number",value:"phoneNumber",  type: "text"},
//   ];

//   return (
//     <div>
//       <DynamicForm
//         firstPageFields={orderDetailsFields}
//         secondPageFields={receiverDetailsFields}
//       />
//     </div>
//   );
// };
// export default SendOrders;

// google map react

import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SendOrders = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
      <div
        style={{
          top: 20,
          margin: "10px",
          borderRadius: "10%",
          position: "absolute",
          width: "20%",
          height: "10%",
          backgroundColor: "#fff",
        }}
      ></div>
    </div>
  );
};
export default SendOrders;

// leaflet.js ma
// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import { borderRadius } from "@mui/system";

// const SendOrders = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     mapRef.current = L.map("map").setView([51.505, -0.09], 13);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(mapRef.current);
//   }, []);

//   return (
//     <>
//       <div id="map" style={{ height: "300px", width: "100%" }}></div>
//       <div
//         style={{
//           top: 20,
//           margin: "10px",
//           borderRadius: "10%",
//           position: "absolute",
//           width: "20%",
//           height: "10%",
//           backgroundColor: "#fff",
//         }}
//       ></div>
//     </>
//   );
// };

// export default SendOrders;
