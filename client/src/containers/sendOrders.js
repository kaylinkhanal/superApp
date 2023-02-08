import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = (props) => <div>{props.text}</div>;

const SendOrders =()=>{
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  function renderMarkers(map, maps) {
    console.log(map)
    let marker = new maps.Marker({
      position:defaultProps.center ,
      map,
      title: 'Hello World!'
    });
  }
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
      <div style={{ top:5, margin:'5px', borderRadius:'5%', position:"absolute", width:'20%', height: '10%' , backgroundColor:'#fff' }}> 
        Select your pick up address
      </div>
    </div>
  );
}

export default SendOrders



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
