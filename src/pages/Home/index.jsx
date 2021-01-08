import React, { useState, useCallback } from "react";
import Game from "../Game";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

const userSchema = yup.object().shape({
  username: yup.string().required("This field is required !"),
  email: yup
    .string()
    .email("Email is invalid")
    .required("This field is required !"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Your phone have to contain numbers")
    .required("This field is required"),
});

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useDispatch();
  const {
    handleChange,
    values,
    
    isValid,
    errors,
    touched,
    handleBlur,
    setValues,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      totalPoint: 25000,
      cards: [],
    },
    validationSchema: userSchema,
    validationOnMount: true,
  });
  const setAllTouched = useCallback(() => {
    const fields = ["username","email","phone"];
    fields.forEach((field)=>{
      setFieldTouched(field,true);
    });
  }, [setFieldTouched]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      setAllTouched();
      return;
    }
    dispatch({ type: "ADD_PLAYER", payload: values });
    setIsStarted(true);
    console.log(values);
  };
 
  const handleSetDefaultPlayer = useCallback(() => {
    const defaultPlayer = {
      username: "danghungthai41",
      email: "danghungthai41@gmail.com",
      phone: "0906709400",
      totalPoint: 25000,
      cards: [],
    };
    setValues(defaultPlayer);
  }, [setValues]);

  return (
    <>
      {isStarted ? (
        <Game />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="diplay-4 mb-5"> Welcome to Pocker Center</h1>
          <h3>Fill your info and start</h3>
          <form className="w-25 mx-auto" onSubmit={handleSubmit}>
            <input
              type="input"
              placeholder="username"
              className="w-100 form-control mb-3"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
            />
            {touched.username && (
              <p className="text-danger">{errors.username}</p>
            )}
            <input
              type="input"
              placeholder="email"
              className="w-100 form-control mb-3"
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && <p className="text-danger">{errors.email}</p>}
            <input
              type="input"
              placeholder="phone"
              className="w-100 form-control mb-3"
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
            />
            {touched.phone && <p className="text-danger">{errors.phone}</p>}

            <button className="btn btn-success w-100">Start new Game</button>
          </form>
          <button
            className="btn btn-primary w-25 mt-2"
            onClick={handleSetDefaultPlayer}
          >
            Set default player
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
