import React, { useEffect, useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  // 打印当前的 URL，每次 a 或 b 改变时都会触发
  useEffect(() => {
    console.log(`${REMOTE_SERVER}/lab5/add/${a}/${b}`);
  }, [a, b]);
  return (
    <div>
      <h3>Path Parameters</h3>
      <input className="form-control mb-2" id="wd-path-parameter-a" type="number" defaultValue={a}
             onChange={(e) => setA(e.target.value)}/>
      <input className="form-control mb-2" id="wd-path-parameter-b" type="number" defaultValue={b}
             onChange={(e) => setB(e.target.value)}/>
      <a className="btn btn-primary me-2" id="wd-path-parameter-add"
         href={`${REMOTE_SERVER}/lab5/add/${a}/${b}`}>
         Add {a} + {b}
      </a>
      <a className="btn btn-danger" id="wd-path-parameter-subtract" 
         href={`${REMOTE_SERVER}/lab5/subtract/${a}/${b}`}>
         Substract {a} - {b}
      </a>
      <hr />
    </div>
  );
}
